import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import './CourseGrid.css';

const CourseGrid = ({ courses, onDeleteCourse, onEditCourse, showActions = false, onCourseClick, isEditor = false }) => {
  return (
    <div className={`course-grid ${isEditor ? 'course-grid--editor' : ''}`}>
      {courses.map(course => (
        <CourseCard 
          key={course.id} 
          course={course} 
          onDelete={onDeleteCourse}
          onEdit={onEditCourse}
          showActions={showActions}
          onClick={onCourseClick}
        />
      ))}
    </div>
  );
};

export default CourseGrid;