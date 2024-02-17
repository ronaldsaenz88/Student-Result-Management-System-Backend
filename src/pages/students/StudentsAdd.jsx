import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Students.css';

export default function StudentsAdd() {
    // Assuming you have student data in the format [{_id, dateOfBirth, email, familyName, firstName, fullName, status}, ...]

    const [firstName, setFirstName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    // Handle errors
    const handleStudentsAdd = async (event) => {
        event.preventDefault();

        // Validation logic
        if (!firstName || !familyName || !dateOfBirth || !email) {
            setError('All fields must be filled.');
            return;
        }

        // Validate email
        if (!validateEmail(email)) {
            setError('Invalid email address. Please enter a valid email.');
            return;
        }
    
        // Validate age
        const age = calculateAge(dateOfBirth);
        if (age < 10) {
            setError('Student must be at least 10 years old.');
            return;
        }
        
        // Format dateOfBirth into MM-dd-yyyy 
        const dateOfBirthFormatted = dateOfBirth.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        }).replace(/\//g, '-');

        // Make API call
        try {
            const response = await fetch('https://student-mngt-system-backend-ae1fa06b6810.herokuapp.com/api/create_student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "firstName": firstName,
                    "familyName": familyName,
                    "dateOfBirth": dateOfBirthFormatted,
                    "email": email
                }),
            });
    
            const data = await response.json();
    
            // Check if the API call was successful
            if (response.ok) {
                if(data.error)
                {
                    setError(data.error || "Failed to create student.");
                    return;
                }
                
                alert("Student created successfully!");
                console.log('Student Created:', { firstName }, " ", { familyName });

                // Clear form and error
                setFirstName('');
                setFamilyName('');
                setDateOfBirth('');
                setEmail('');
                setError('');                
            // You can redirect or do other actions as needed
            } else {
                setError(data.error || "Failed to create student.");
            }
        } catch (error) {
            console.error('Error creating student:', error);
            setError("Failed to create student. Please try again.");
        }
    };

    return (
        <div className="students-content">
            <div className="form">
                <h1>Add New Student</h1>

                <form className="form justify-content-center" onSubmit={handleStudentsAdd}>
                    <div>
                        <label htmlFor="firstName">First Name :</label>
                        <input
                            type="text"
                            className="forminput"
                            id="firstName"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="familyName">Family Name :</label>
                        <input
                            type="text"
                            className="forminput"
                            id="familyName"
                            placeholder="Enter family name"
                            value={familyName}
                            onChange={(e) => setFamilyName(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="dateOfBirth">Date of Birth :</label>

                        <DatePicker
                            id="dateOfBirth"
                            className="forminput"
                            selected={dateOfBirth}
                            onChange={(date) => setDateOfBirth(date)}
                            dateFormat="MM-dd-yyyy"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            className="forminput"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};
