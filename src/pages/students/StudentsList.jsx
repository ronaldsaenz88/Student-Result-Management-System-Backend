import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // Assuming you're using FontAwesome
import './Students.css';

export default function StudentsList() {
    // Assuming you have student data in the format [{_id, dateOfBirth, email, familyName, firstName, fullName, status}, ...]

    const [students, setStudents] = useState([]);
  
    // Fetch or set your student data using useEffect or other methods
    useEffect(() => {
        fetchStudents();
    }, []);
  
    const fetchStudents = async () => {
        try {
            const response = await fetch('https://student-mngt-system-backend-ae1fa06b6810.herokuapp.com/api/get_students');
            const data = await response.json();
            setStudents(data.students);
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    const handleDelete = async (studentId) => {
        try {
            const response = await fetch(`https://student-mngt-system-backend-ae1fa06b6810.herokuapp.com/api/delete_student/${studentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                // Course deletion was successful
                alert("Student deleted successfully!");
                console.log(`Delete student with ID: ${studentId}`);
                
                fetchStudents();
            } else {
                console.error('Error deleting student:', data.error);
            }
        } catch (error) {
            console.error('Error deleting student:', error);
        }
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
                                <button className="delete-button" onClick={() => handleDelete(student._id)}>
                                    <FaTimes />
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
