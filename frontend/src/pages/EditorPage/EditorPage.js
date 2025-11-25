import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditorSidebar from '../../components/EditorSidebar/EditorSidebar';
import CourseGrid from '../../components/CourseGrid/CourseGrid';
import CourseForm from '../../components/CourseForm/CourseForm';
import { coursesAPI } from '../../services/api';
import './EditorPage.css';

const EditorPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('courses');
  const [editingCourse, setEditingCourse] = useState(null);
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

  const handleEditCourse = (courseId) => {
    const courseToEdit = courses.find(course => course.id === courseId);
    setEditingCourse(courseToEdit);
    setActiveView('add');
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    setEditingCourse(null);
  };

  const handleFormSubmit = async (courseData) => {
    try {
      if (editingCourse) {
        const response = await coursesAPI.update(editingCourse.id, courseData);
        setCourses(courses.map(course => 
          course.id === editingCourse.id ? response.data : course
        ));
      } else {
        const response = await coursesAPI.create(courseData);
        setCourses([...courses, response.data]);
      }
      setActiveView('courses');
      setEditingCourse(null);
    } catch (err) {
      setError('Ошибка при сохранении курса');
      console.error(err);
    }
  };

  const handleFormCancel = () => {
    setActiveView('courses');
    setEditingCourse(null);
  };

  const handleCourseClick = (course) => {
    navigate(`/course/${course.id}`);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'courses':
        return (
          <CourseGrid 
            courses={courses} 
            onDeleteCourse={handleDeleteCourse}
            onEditCourse={handleEditCourse}
            showActions={true}
            isEditor={true}
            onCourseClick={handleCourseClick} // Добавляем обработчик клика
          />
        );

      case 'add':
        return (
          <CourseForm 
            course={editingCourse}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        );
      case 'settings':
        return (
          <div className="editor-content__placeholder">
            <h2>Настройки</h2>
            <p>Раздел настроек находится в разработке</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <div className="container">Загрузка...</div>;

  return (
    <div className="editor-page">
      <div className="editor-page__container">
        <EditorSidebar 
          activeView={activeView}
          onViewChange={handleViewChange}
        />
        <div className="editor-content">
          <div className="editor-content__wrapper">
            {error && <div className="error-message">{error}</div>}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;