import React, { useState, useEffect } from 'react';
import CourseGrid from '../../components/CourseGrid/CourseGrid';
import { coursesAPI } from '../../services/api';
import './CoursesPage.css';
import { useNavigate } from 'react-router-dom';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await coursesAPI.getAll();
      setCourses(response.data);
    } catch (err) {
      setError('Ошибка при загрузке курсов');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот курс?')) {
      try {
        await coursesAPI.delete(courseId);
        setCourses(courses.filter(course => course.id !== courseId));
      } catch (err) {
        setError('Ошибка при удалении курса');
        console.error(err);
      }
    }
  };
  
  if (loading) return <div className="container">Загрузка...</div>;
  if (error) return <div className="container">Ошибка: {error}</div>;

  const handleCourseClick = (course) => {
    navigate(`/course/${course.id}`);
  };

  return (
    <div className="courses-page">
      <div className="container">
        <h1>Просмотр курсов</h1>
        <CourseGrid 
          courses={courses} 
          onDeleteCourse={handleDeleteCourse}
          showActions={false}
          onCourseClick={handleCourseClick}
        />
      </div>
    </div>
  );
};

export default CoursesPage;