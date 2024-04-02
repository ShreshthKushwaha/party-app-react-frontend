// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';



const Login = ({ setIsAuthenticated }) => {
  const [email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:9090/api/users/');
      const userData = response.data;
      const user = userData.find((user) => user.email === email);

      if (user && user.password === password) {
        setIsAuthenticated(true); // Update isAuthenticated state
        dispatch(login(user.id));
        navigate('/');
        
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Error fetching user data. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
