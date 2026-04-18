from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from .models import Task

# Create your tests here.

class TaskTests(APITestCase):
    def test_authenticated_user_can_create_task(self):
        user = User.objects.create_user(
            username='testuser',
            password='strongpassword123'
        )
        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='TOKEN ' + token.key)
        url = '/api/tasks/'
        data = {
            'title': 'Test Task',
            'description': 'Test Description',
            'status': 'todo',
            'priority': 'high'
        }
        response = self.client.post(url,data,format='json')
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(),1)
        self.assertEqual(Task.objects.get().owner,user)

    def test_user_cannot_acces_another_users_task(self):
        user1 = User.objects.create_user(
        username='user1',
        password='password123'
    )
        user2 = User.objects.create_user(
        username='user2',
        password='password123'
    )
        token = Token.objects.create(user=user2)
        task = Task.objects.create(
        owner=user1,
        title='Private Task',
        description='This task belongs to user1',
        status='todo',
        priority='medium'
        )
        self.client.credentials(HTTP_AUTHORIZATION='token '+token.key)
        url = f'/api/tasks/{task.id}/'
        response = self.client.get(url)
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

    def test_user_sees_only_his_own_tasks(self):
        user1 = User.objects.create_user(
            username='user1',
            password='password123'
    )
        user2 = User.objects.create_user(
            username='user2',
            password='password123'
        )
        token = Token.objects.create(user=user1)
        Task.objects.create(
            owner=user1,
            title='User1 Task 1',
            description='First task for user1',
            status='todo',
            priority='high'
        )

        Task.objects.create(
            owner=user1,
            title='User1 Task 2',
            description='Second task for user1',
            status='done',
            priority='medium'
        )

        Task.objects.create(
            owner=user2,
            title='User2 Task 1',
            description='Task for user2',
            status='todo',
            priority='low'
        )
        self.client.credentials(HTTP_AUTHORIZATION='token '+token.key)
        url='/api/tasks/'
        response= self.client.get(url)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']),2)
        titles = [task['title'] for task in response.data['results']]
        self.assertIn('User1 Task 1',titles)
        self.assertIn('User1 Task 2',titles)
        self.assertNotIn('User2 Task 1',titles)