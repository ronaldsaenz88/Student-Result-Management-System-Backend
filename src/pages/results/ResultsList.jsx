import React, { useState, useEffect } from 'react';
import './Results.css';

export default function ResultsList() {
    // Assuming you have course data in the format [{_id, courseName, status}, ...]

    const [results, setResults] = useState([]);
  
    // Fetch or set your course data using useEffect or other methods
    useEffect(() => {
      const fetchResults = async () => {
        try {
          const response = await fetch('https://student-mngt-system-backend-ae1fa06b6810.herokuapp.com/api/get_results');
          const data = await response.json();
          setResults(data.results);
        } catch (error) {
          console.error('Error fetching results data:', error);
        }
      };
  
      fetchResults();
    }, []);


    return (
        <div className="results-content">
            <h1>Results List</h1>
        
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                        <th>Course</th>
                        <th>Student</th>
                        <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                        <tr key={index}>
                            <td>{result.courseName}</td>
                            <td>{result.studentName}</td>
                            <td>{result.score}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
