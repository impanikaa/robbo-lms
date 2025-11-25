import React from 'react';
import './CourseCard.css';
import courseImage from '../../assets/course_img.png';

const CourseCard = ({ course, onDelete, onEdit, showActions = false, onClick }) => {
  const { id, title, description } = course;

  const handleCardClick = () => {
    if (onClick) {
      onClick(course);
    }
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    action(id);
  };

  return (
    <div className="course-card" onClick={handleCardClick}>
      <div className="course-card__image">
        <img src={courseImage} alt={title} />
      </div>
      <div className="course-card__content">
        <h3 className="course-card__title">{title}</h3>
        <p className="course-card__description">
          {description && description.length > 180 
            ? `${description.substring(0, 180)}...` 
            : description
          }
        </p>
        {showActions && (
          <div className="course-card__actions">
            <button 
              className="course-card__btn course-card__btn--edit"
              data-tooltip="Редактировать"
              onClick={(e) => handleActionClick(e, onEdit)}
            >
              <svg className="course-card__icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </button>
            <button 
              className="course-card__btn course-card__btn--delete"
              data-tooltip="Удалить"
              onClick={(e) => handleActionClick(e, onDelete)}
            >
              <svg className="course-card__icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;