import React from 'react';

/**
 * StudentCard Component
 * Displays registered student information in a neat card layout.
 * 
 * Props:
 * - student: Object containing student details: 
 *   { fullName, email, phone, dob, gender, course, address }
 */
function StudentCard({ student }) {
  return (
    <div className="student-card">
      <div className="card-header">
        <h3 className="student-name">{student.fullName}</h3>
        <span className="course-badge">{student.course}</span>
      </div>
      <div className="card-body">
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Mobile:</strong> {student.phone}</p>
        <p><strong>Date of Birth:</strong> {student.dob}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p className="card-address"><strong>Address:</strong> {student.address}</p>
      </div>
    </div>
  );
}

export default StudentCard;
