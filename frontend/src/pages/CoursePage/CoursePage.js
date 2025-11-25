import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesAPI } from '../../services/api';
import './CoursePage.css';
import courseImage from '../../assets/course_img.png';

const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        // Получаем все курсы и находим нужный по ID
        const response = await coursesAPI.getAll();
        const foundCourse = response.data.find(c => c.id === parseInt(id));
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError('Курс не найден');
        }
      } catch (err) {
        setError('Ошибка при загрузке курса');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const handleEnroll = () => {
    alert('Запись на курс! В реальном приложении здесь будет функционал записи.');
  };

  if (loading) return <div className="container">Загрузка...</div>;
  if (error) return <div className="container">Ошибка: {error}</div>;
  if (!course) return <div className="container">Курс не найден</div>;

  return (
    <div className="course-page">
      <div className="container">
        <div className="course-page__content">
          <div className="course-page__sidebar">
            <img src={courseImage} alt={course.title} className="course-page__image" />
            <h1 className="course-page__title">{course.title}</h1>
            <button className="course-page__enroll-btn" onClick={handleEnroll}>
              Записаться на курс
            </button>
          </div>
          <div className="course-page__main">
            <div className="course-page__section">
              <h2>Описание курса</h2>
              <p className="course-page__description">{course.description}</p>
            </div>
            <div className="course-page__section">
              <h2>Автор</h2>
              <p className="course-page__author">{course.author}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;