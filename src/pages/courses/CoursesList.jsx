import React, { useState, useEffect } from 'react';
import './Courses.css';

export default function CoursesList() {
    // Assuming you have course data in the format [{_id, courseName, status}, ...]

    const [courses, setCourses] = useState([]);
  
    // Fetch or set your course data using useEffect or other methods
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://student-mngt-system-backend-ae1fa06b6810.herokuapp.com/api/get_courses');
                const data = await response.json();
                setCourses(data.courses);
            } catch (error) {
                console.error('Error fetching courses data:', error);
            }
        };
  
        fetchCourses();
    }, []);
  

    const handleDelete = (courseId) => {
        // Implement your delete logic here
        console.log(`Delete course with ID: ${courseId}`);
    };

    return (
        <div className="courses-content">
            <h1>Courses List</h1>
        
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                        <th>Course Name</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                        <tr key={index}>
                            <td>{course.courseName}</td>
                            <td>
                            <button onClick={() => handleDelete(course._id)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
