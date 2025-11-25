import React, { useState, useEffect } from 'react';
import './CourseForm.css';

const CourseForm = ({ course, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description || '');
      setAuthor(course.author || '');
    }
  }, [course]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Название обязательно';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Название должно содержать минимум 3 символа';
    }
    if (!author.trim()) {
      newErrors.author = 'Автор обязателен';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        author: author.trim(),
      });
    }
  };

  return (
    <div className="course-form">
      <h1>{course ? 'Редактировать курс' : 'Создать новый курс'}</h1>
      
      <div className="form-section">
        <h2>Название</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`form-input ${errors.title ? 'error' : ''}`}
          placeholder="Введите название курса"
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-section">
        <h2>Описание</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          placeholder="Введите описание курса"
          rows="4"
        />
      </div>

      <div className="form-section">
        <h2>Автор</h2>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={`form-input ${errors.author ? 'error' : ''}`}
          placeholder="Введите имя автора"
        />
        {errors.author && <span className="error-text">{errors.author}</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" className="btn-submit" onClick={handleSubmit}>
          {course ? 'Сохранить' : 'Создать'}
        </button>
      </div>
    </div>
  );
};

export default CourseForm;