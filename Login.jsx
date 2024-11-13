/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Authentication logic (placeholder)
    const validEmail = 'admin@meetingscheduler.com';
    const validPassword = 'scheduler123';

    if (email === validEmail && password === validPassword) {
      setErrorMessage('');
      navigate('/dashboard'); // Navigate to dashboard upon successful login
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>

          <p className="signup-prompt">
            Don't have an account? <span onClick={() => navigate('/registration')}>Sign up here</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: { email, password },
      });

      // Check if a user exists with the given email and password
      const user = response.data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        setErrorMessage('');
        navigate('/dashboard');
      } else {
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>

          <p className="signup-prompt">
            Don't have an account? <span onClick={() => navigate('/registration')}>Sign up here</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
