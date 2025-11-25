import axios from 'axios';

// Автоматически определяем URL API в зависимости от среды
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // В продакшене используем относительный путь (прокси через nginx)
  : 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const coursesAPI = {
  // Получить все курсы
  getAll: () => api.get('/courses/'),
  
  // Создать курс
  create: (courseData) => api.post('/courses/', courseData),
  
  // Обновить курс
  update: (id, courseData) => api.put(`/courses/${id}/`, courseData),
  
  // Удалить курс
  delete: (id) => api.delete(`/courses/${id}/`),
};

export default api;