import React, { useState, useEffect } from 'react';
import './Students.css';

export default function StudentsList() {
    // Assuming you have student data in the format [{_id, dateOfBirth, email, familyName, firstName, fullName, status}, ...]

    const [students, setStudents] = useState([]);
  
    // Fetch or set your student data using useEffect or other methods
    useEffect(() => {
      const fetchStudents = async () => {
        try {
          const response = await fetch('https://student-mngt-system-backend-ae1fa06b6810.herokuapp.com/api/get_students');
          const data = await response.json();
          setStudents(data.students);
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };
  
      fetchStudents();
    }, []);
  

    const handleDelete = (studentId) => {
        // Implement your delete logic here
        console.log(`Delete student with ID: ${studentId}`);
    };

    return (
        <div className="students-content">
            <h1>Students List</h1>
        
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                        <th>Name & Family Name</th>
                        <th>DOB</th>
                        <th>Email</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.fullName}</td>
                            <td>{student.dateOfBirth}</td>
                            <td>{student.email}</td>
                            <td>
                            <button onClick={() => handleDelete(student._id)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
