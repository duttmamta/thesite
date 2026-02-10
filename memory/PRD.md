# Xtrec - Technology Startup Website PRD

## Original Problem Statement
Build a clean, modern technology startup website for Xtrec, a UK-based company developing smart connected hardware and software products focused on everyday productivity, sports performance, and sustainability.

## User Personas
1. **Government Grant Reviewers** - Need credible, professional presentation of technology capabilities
2. **Investors** - Looking for clear value proposition and market opportunity
3. **Early Adopters** - Interested in pilot programmes for new products
4. **SME Owners** - Potential customers for carbon measurement platform

## Core Requirements (Static)
- Minimal, professional design suitable for grant applications
- Deep blue (#002E5D) accent colour
- Custom SVG logo with connected nodes concept
- 5 pages: Home, Products, Platform, Sustainability, Contact
- Contact form with Resend email integration
- Pilot programme signup functionality
- Mobile responsive design

## What's Been Implemented (Feb 2025)

### Backend (FastAPI)
- `/api/contact` - Contact form submission with Resend email confirmation
- `/api/pilot-signup` - Pilot programme registration with welcome email
- `/api/contacts` - Admin endpoint to view submissions
- `/api/pilot-signups` - Admin endpoint to view signups
- MongoDB integration for data persistence

### Frontend (React + Tailwind)
- **Homepage**: Hero section, 3 product pillars, Why Xtrec highlights, CTA section
- **Products Page**: Carbon Platform, Ambient Displays, Sports Devices with detailed descriptions
- **Platform Page**: IoT platform explanation, technical capabilities, partnership CTA
- **Sustainability Page**: Net-zero mission, Scope 1/2/3 emissions tracking
- **Contact Page**: Contact form with interest selection, info cards

### Design
- Custom SVG logo with 3 connected nodes
- Outfit font for headings, Manrope for body
- Abstract geometric placeholders for products
- Clean, minimal aesthetic with generous whitespace

## Prioritized Backlog

### P0 (Critical)
- All core functionality implemented ✅

### P1 (High Priority)
- Privacy Policy page
- Terms of Service page
- Cookie consent banner
- SEO meta tags and Open Graph

### P2 (Medium Priority)
- Blog/News section for company updates
- Team page with founder information
- Case studies once pilot users provide testimonials
- FAQ page for common questions

### P3 (Nice to Have)
- Live chat integration
- Multi-language support
- Dark mode toggle
- Newsletter archive

## Next Action Items
1. Add Privacy Policy and Terms of Service pages
2. Implement SEO meta tags for better search visibility
3. Consider adding analytics (privacy-respecting like Plausible)
4. Create blog section for company updates and thought leadership
