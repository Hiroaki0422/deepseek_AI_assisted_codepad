import unittest
from app import create_app

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_generate_response(self):
        response = self.client.post("/generate", json={"query": "Translate 'Hello' to French."})
        self.assertEqual(response.status_code, 200)
        self.assertIn("response", response.get_json())

if __name__ == "__main__":
    unittest.main()
