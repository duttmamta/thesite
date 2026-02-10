import requests
import sys
import json
from datetime import datetime

class XtrecAPITester:
    def __init__(self, base_url="https://smart-connected.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_base = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.api_base}{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            result = {
                "test": name,
                "endpoint": endpoint,
                "method": method,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response": response.text[:500] if response.text else None
            }
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.text:
                    try:
                        json_response = response.json()
                        print(f"   Response preview: {json.dumps(json_response, indent=2)[:200]}...")
                        result["response_json"] = json_response
                    except:
                        print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:300]}...")

            self.results.append(result)
            return success, response.json() if success and response.text else {}

        except requests.exceptions.ConnectionError as e:
            print(f"❌ Failed - Connection Error: {str(e)}")
            result = {
                "test": name,
                "endpoint": endpoint,
                "success": False,
                "error": f"Connection Error: {str(e)}"
            }
            self.results.append(result)
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test": name,
                "endpoint": endpoint,
                "success": False,
                "error": str(e)
            }
            self.results.append(result)
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "/",
            200
        )

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "interest": "carbon-platform",
            "message": "This is a test message from automated testing"
        }
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "/contact",
            200,
            data=test_data
        )

    def test_pilot_signup_new(self):
        """Test pilot signup with new email"""
        timestamp = datetime.now().strftime('%H%M%S')
        test_data = {
            "email": f"pilot.test.{timestamp}@example.com",
            "interest": "ambient-displays"
        }
        return self.run_test(
            "Pilot Signup (New Email)",
            "POST",
            "/pilot-signup",
            200,
            data=test_data
        )

    def test_pilot_signup_duplicate(self):
        """Test pilot signup with duplicate email (should fail)"""
        test_data = {
            "email": "duplicate@example.com",
            "interest": "sports-devices"
        }
        # First signup should succeed
        success1, _ = self.run_test(
            "Pilot Signup (First)",
            "POST",
            "/pilot-signup",
            200,
            data=test_data
        )
        
        # Second signup should fail with 400
        if success1:
            success2, _ = self.run_test(
                "Pilot Signup (Duplicate - Should Fail)",
                "POST",
                "/pilot-signup",
                400,
                data=test_data
            )
            return success2
        return False

    def test_get_contacts(self):
        """Test getting contact submissions (admin endpoint)"""
        return self.run_test(
            "Get Contact Submissions",
            "GET",
            "/contacts",
            200
        )

    def test_get_pilot_signups(self):
        """Test getting pilot signups (admin endpoint)"""
        return self.run_test(
            "Get Pilot Signups",
            "GET",
            "/pilot-signups",
            200
        )

    def test_invalid_contact_data(self):
        """Test contact form with invalid data"""
        test_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email format
            "interest": "invalid-interest"
        }
        return self.run_test(
            "Contact Form (Invalid Data)",
            "POST",
            "/contact",
            422,  # Validation error
            data=test_data
        )

    def test_invalid_pilot_data(self):
        """Test pilot signup with invalid data"""
        test_data = {
            "email": "not-an-email",  # Invalid email format
        }
        return self.run_test(
            "Pilot Signup (Invalid Data)", 
            "POST",
            "/pilot-signup",
            422,  # Validation error
            data=test_data
        )

def main():
    print("🚀 Starting Xtrec API Testing...")
    print("=" * 50)
    
    # Setup
    tester = XtrecAPITester()

    # Run all tests
    print("\n📡 Testing Core API Endpoints...")
    tester.test_root_endpoint()
    
    print("\n📧 Testing Contact Form...")
    tester.test_contact_submission()
    tester.test_invalid_contact_data()
    
    print("\n🎯 Testing Pilot Signup...")
    tester.test_pilot_signup_new()
    tester.test_pilot_signup_duplicate()
    tester.test_invalid_pilot_data()
    
    print("\n📊 Testing Admin Endpoints...")
    tester.test_get_contacts()
    tester.test_get_pilot_signups()

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 FINAL RESULTS")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    # Show failed tests
    failed_tests = [r for r in tester.results if not r.get("success", False)]
    if failed_tests:
        print(f"\n❌ Failed Tests ({len(failed_tests)}):")
        for test in failed_tests:
            print(f"   - {test['test']}: {test.get('error', f'Status {test.get('actual_status')}')}") 
    
    # Save results
    try:
        with open('/app/backend_test_results.json', 'w') as f:
            json.dump({
                "total_tests": tester.tests_run,
                "passed_tests": tester.tests_passed,
                "success_rate": (tester.tests_passed/tester.tests_run)*100,
                "results": tester.results
            }, f, indent=2)
        print(f"\n💾 Results saved to /app/backend_test_results.json")
    except Exception as e:
        print(f"⚠️  Could not save results: {e}")

    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())