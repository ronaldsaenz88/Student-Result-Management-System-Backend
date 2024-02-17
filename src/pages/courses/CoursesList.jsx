import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // Assuming you're using FontAwesome
import './Courses.css';

export default function CoursesList() {
    // Assuming you have course data in the format [{_id, courseName, status}, ...]

    const [courses, setCourses] = useState([]);
  
    // Fetch or set your course data using useEffect or other methods
    useEffect(() => {
        fetchCourses();
    }, []);
  
    const fetchCourses = async () => {
        try {
            const response = await fetch('https://student-mngt-system-backend-ae1fa06b6810.herokuapp.com/api/get_courses');
            const data = await response.json();
            setCourses(data.courses);
        } catch (error) {
            console.error('Error fetching courses data:', error);
        }
    };

    const handleDelete = async (courseId) => {
        try {
            const response = await fetch(`https://student-mngt-system-backend-ae1fa06b6810.herokuapp.com/api/delete_course/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                // Course deletion was successful
                alert("Course deleted successfully!");
                console.log(`Delete course with ID: ${courseId}`);
                
                fetchCourses();
            } else {
                console.error('Error deleting course:', data.error);
            }
        } catch (error) {
            console.error('Error deleting course:', error);
        }
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
                                <button className="delete-button" onClick={() => handleDelete(course._id)}>
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
