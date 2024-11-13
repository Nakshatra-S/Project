import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigateToScheduling = () => {
    navigate('/easy-scheduling');
  };

  const handleNavigateToCalendar = () => {
    navigate('/calendar-manager'); // Navigate to Manage Calendar page
  };
  const handleNavigateToManager = () => {
    navigate('/reminder-manager'); // Navigate to Manage Calendar page
  };
  
  const handleNavigateToRegistration = () => {
    navigate('/registration'); // Navigate to Manage Calendar page
  };
  const handleNavigateToLogin = () => {
    navigate('/login'); // Navigate to Manage Calendar page
  };


  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Online Meeting Scheduler</h1>
        <p>Schedule and manage your meetings effortlessly.</p>
      </header>

      <section className="home-features">
        <div className="feature">
          <h2>Easy Scheduling</h2>
          <p>Quickly set up meetings with just a few clicks.</p>
          <button className="home-btn" onClick={handleNavigateToScheduling}>Go to Easy Scheduling</button>
        </div>
        <div className="feature">
          <h2>Manage Your Calendar</h2>
          <p>Keep track of all your meetings in one place.</p>
          <button className="home-btn" onClick={handleNavigateToCalendar}>Manage Calendar</button>
        </div>
        <div className="feature">
          <h2>Reminders</h2>
          <p>Receive timely reminders so you never miss a meeting.</p>
          <button className="home-btn" onClick={handleNavigateToManager}>Remind Me</button>
        </div>
      </section>

      <section className="home-actions">
        <button className="home-btn" onClick={handleNavigateToRegistration}>Get Started</button>
        <button className="home-btn" onClick={handleNavigateToLogin}>Join Meeting</button>
      </section>
    </div>
  );
};

export default HomePage;
