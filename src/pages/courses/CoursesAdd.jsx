import React, { useState, useEffect } from 'react';
import './Courses.css';

export default function CoursesAdd() {
    // Assuming you have course data in the format [{_id, courseName, status}, ...]

    const [courseName, setCourseName] = useState('');
    const [error, setError] = useState('');

    // Handle errors
    const handleCoursesAdd = async (event) => {
        event.preventDefault();

        // Validation logic
        if (!courseName) {
            setError('All fields must be filled.');
            return;
        }

        // Make API call
        try {
            const response = await fetch('https://student-mngt-system-backend-ae1fa06b6810.herokuapp.com/api/create_course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "courseName": courseName
                }),
            });
    
            const data = await response.json();
    
            // Check if the API call was successful
            if (response.ok) {
                if(data.error)
                {
                    setError(data.error || "Failed to create course.");
                    return;
                }
                
                alert("Course created successfully!");
                console.log('Course Created:', { courseName });

                // Clear form and error
                setCourseName('');
                setError('');                
            // You can redirect or do other actions as needed
            } else {
                setError(data.error || "Failed to create course.");
            }
        } catch (error) {
            console.error('Error creating course:', error);
            setError("Failed to create course. Please try again.");
        }
    };

    return (
        <div className="courses-content">
            <div className="form">
                <h1>Add New Course</h1>

                <form className="form justify-content-center" onSubmit={handleCoursesAdd}>
                    <div>
                        <label htmlFor="courseName">Course Name :</label>
                        <input
                            type="text"
                            className="forminput"
                            id="courseName"
                            placeholder="Enter course name"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};
