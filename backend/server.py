from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    interest: str
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    interest: str
    message: Optional[str] = None

class PilotSignup(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    interest: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PilotSignupCreate(BaseModel):
    email: EmailStr
    interest: Optional[str] = None


# Routes
@api_router.get("/")
async def root():
    return {"message": "Xtrec API - Smart connected technology"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(input: ContactSubmissionCreate):
    """Submit a contact form and send email notification"""
    contact_obj = ContactSubmission(**input.model_dump())
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    # Save to database
    await db.contact_submissions.insert_one(doc)
    
    # Send email notification
    try:
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A;">
            <h2 style="color: #002E5D;">New Contact Form Submission - Xtrec</h2>
            <hr style="border: 1px solid #E2E8F0;">
            <p><strong>Name:</strong> {input.name}</p>
            <p><strong>Email:</strong> {input.email}</p>
            <p><strong>Interest:</strong> {input.interest}</p>
            <p><strong>Message:</strong> {input.message or 'No message provided'}</p>
            <hr style="border: 1px solid #E2E8F0;">
            <p style="color: #64748B; font-size: 12px;">Submitted at: {doc['timestamp']}</p>
        </body>
        </html>
        """
        
        params = {
            "from": SENDER_EMAIL,
            "to": [input.email],
            "subject": f"Thank you for contacting Xtrec, {input.name}!",
            "html": f"""
            <html>
            <body style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A;">
                <h2 style="color: #002E5D;">Thank you for reaching out!</h2>
                <p>Hi {input.name},</p>
                <p>We've received your inquiry about <strong>{input.interest}</strong>.</p>
                <p>Our team will get back to you shortly.</p>
                <br>
                <p>Best regards,<br><strong>The Xtrec Team</strong></p>
                <hr style="border: 1px solid #E2E8F0;">
                <p style="color: #64748B; font-size: 12px;">Xtrec - Smart connected technology for everyday life and a sustainable future.</p>
            </body>
            </html>
            """
        }
        
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Confirmation email sent to {input.email}")
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        # Don't fail the request if email fails - form is still saved
    
    return contact_obj

@api_router.post("/pilot-signup", response_model=PilotSignup)
async def pilot_signup(input: PilotSignupCreate):
    """Sign up for the pilot programme"""
    signup_obj = PilotSignup(**input.model_dump())
    doc = signup_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    # Check if already signed up
    existing = await db.pilot_signups.find_one({"email": input.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered for pilot programme")
    
    # Save to database
    await db.pilot_signups.insert_one(doc)
    
    # Send welcome email
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [input.email],
            "subject": "Welcome to the Xtrec Pilot Programme!",
            "html": f"""
            <html>
            <body style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A;">
                <h2 style="color: #002E5D;">Welcome to the Xtrec Pilot Programme!</h2>
                <p>Thank you for joining our pilot programme.</p>
                <p>You're now part of an exclusive group helping shape the next generation of connected devices.</p>
                {f'<p>Your interest area: <strong>{input.interest}</strong></p>' if input.interest else ''}
                <p>We'll be in touch soon with updates and early access opportunities.</p>
                <br>
                <p>Best regards,<br><strong>The Xtrec Team</strong></p>
                <hr style="border: 1px solid #E2E8F0;">
                <p style="color: #64748B; font-size: 12px;">Xtrec - Smart connected technology for everyday life and a sustainable future.</p>
            </body>
            </html>
            """
        }
        
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Welcome email sent to {input.email}")
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
    
    return signup_obj

@api_router.get("/pilot-signups", response_model=List[PilotSignup])
async def get_pilot_signups():
    """Get all pilot signups (admin)"""
    signups = await db.pilot_signups.find({}, {"_id": 0}).to_list(1000)
    for signup in signups:
        if isinstance(signup['timestamp'], str):
            signup['timestamp'] = datetime.fromisoformat(signup['timestamp'])
    return signups

@api_router.get("/contacts", response_model=List[ContactSubmission])
async def get_contacts():
    """Get all contact submissions (admin)"""
    contacts = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    for contact in contacts:
        if isinstance(contact['timestamp'], str):
            contact['timestamp'] = datetime.fromisoformat(contact['timestamp'])
    return contacts


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
