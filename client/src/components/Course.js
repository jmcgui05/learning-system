import React from 'react';

const Course = ({ course }) => {
  return (
    <tr>
      <td>{course._id}</td>
      <td>{course.name}</td>
      <td>{course.length}</td>
      <td>{course.subject}</td>
    </tr>
  )
};

export default Course;
