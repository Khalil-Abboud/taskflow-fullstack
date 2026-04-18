from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

# Create your tests here.
class RegisterTests(APITestCase):
    def test_user_can_register(self):
        url = '/api/users/register/'
        data = {
            'username':'testuser',
            'email': 'user@example.com',
            'password': 'strongpassword123'
        }
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(),1)
        self.assertEqual(User.objects.get().username,'testuser')

class LoginTests(APITestCase):
    def test_user_can_login_and_recive_token(self):
        User.objects.create_user(
            username='testuser',
            password='strongpassword123',
            email='user@example.com'
        )
        url = '/api/users/login/'
        data = {
            'username':'testuser',
            'password':'strongpassword123',
        }
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertIn('token',response.data)
        self.assertEqual(response.data['username'],'testuser')
        self.assertEqual(response.data['email'],'user@example.com')
        