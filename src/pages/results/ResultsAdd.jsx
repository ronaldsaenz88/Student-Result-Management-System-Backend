import React, { useState, useEffect } from 'react';
import './Results.css';

export default function ResultsAdd() {
    // Assuming you have course data in the format [{_id, courseName, status}, ...]

    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [scoreOptions] = useState(['A', 'B', 'C', 'D', 'E', 'F']);

    const [courseId, setCourseId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [score, setScore] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch courses
        fetch('https://student-mngt-system-backend-ae1fa06b6810.herokuapp.com/api/get_courses')
            .then(response => response.json())
            .then(data => setCourses(data.courses))
            .catch(error => console.error('Error fetching courses:', error));

        // Fetch students
        fetch('https://student-mngt-system-backend-ae1fa06b6810.herokuapp.com/api/get_students')
            .then(response => response.json())
            .then(data => setStudents(data.students))
            .catch(error => console.error('Error fetching students:', error));  
    }, []); // Empty dependency array ensures the effect runs only once on mount


    // Handle errors
    const handleResultsAdd = async (event) => {
        event.preventDefault();

        // Validation logic
        if (!courseId || !studentId || !score) {
            setError('All fields must be filled.');
            return;
        }

        // Make API call
        try {
            const response = await fetch('https://student-mngt-system-backend-ae1fa06b6810.herokuapp.com/api/create_result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "courseId": courseId,
                    "studentId": studentId,
                    "score": score
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
                
                alert("Result created successfully!");
                console.log('Result Created:', { courseId });

                // Clear form and error
                setCourseId('');
                setStudentId('');
                setScore('');
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
        <div className="results-content">
            <div className="form">
                <h1>Add New Result</h1>

                <form className="form justify-content-center" onSubmit={handleResultsAdd}>
                    <div>
                        <label htmlFor="courseId">Course Name:</label>

                        <select 
                        value={courseId} 
                        className="forminput"
                        id="courseId"
                        onChange={(e) => setCourseId(e.target.value)}>
                            <option value="" disabled>Select a course</option>
                            {courses.map(course => (
                                <option key={course._id} value={course._id}>{course.courseName}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="studentId">Student Name :</label>

                        <select 
                            value={studentId} 
                            className="forminput"
                            id="studentId"
                            onChange={(e) => setStudentId(e.target.value)}>
                                <option value="" disabled>Select a student</option>
                                {students.map(student => (
                                    <option key={student._id} value={student._id}>{student.fullName}</option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="score">Score :</label>

                        <select 
                            value={score} 
                            className="forminput"
                            id="score"
                            onChange={(e) => setScore(e.target.value)}>
                                <option value="" disabled>Select a score</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                        </select>
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};
