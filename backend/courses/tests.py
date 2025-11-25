from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Course

class CourseTests(APITestCase):
    def setUp(self):
        """
        Настройка тестовых данных
        """
        self.course_data = {
            'title': 'Тестовый курс',
            'description': 'Описание тестового курса',
            'author': 'Тестовый автор'
        }
        self.course = Course.objects.create(**self.course_data)
    
    def test_create_course(self):
        """
        Тест создания курса
        """
        url = reverse('course-list')
        response = self.client.post(url, self.course_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Course.objects.count(), 2)
        self.assertEqual(response.data['title'], self.course_data['title'])
    
    def test_get_courses(self):
        """
        Тест получения списка курсов
        """
        url = reverse('course-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], self.course.title)
    
    def test_delete_course(self):
        """
        Тест удаления курса
        """
        url = reverse('course-detail', kwargs={'pk': self.course.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Course.objects.count(), 0)
    
    def test_validation_title_min_length(self):
        """
        Тест валидации: название должно быть не менее 3 символов
        """
        url = reverse('course-list')
        invalid_data = {
            'title': 'ab',
            'description': 'Описание',
            'author': 'Автор'
        }
        response = self.client.post(url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('title', response.data)