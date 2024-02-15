// Import necessary dependencies
import React, { useState } from 'react';

// Define the Login component
const Login = () => {
    // State variables to store user input (email and password)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle changes in the email input
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Function to handle changes in the password input
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add code to handle form submission (e.g., send request to backend)


        try {
            // Send a request to your backend API to authenticate the user
            const response = await fetch('YOUR_BACKEND_LOGIN_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Assuming your backend returns a success message upon successful login
            if (response.ok) {
                setLoginMessage('Login successful');
            } else {
                // Handle unsuccessful login (e.g., display error message)
                setLoginMessage('Incorrect email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., display error message)
        }
    };

    // JSX code for the login form
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

// Export the Login component
export default Login;
