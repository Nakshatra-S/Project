import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Registration from './Registration';  // Import Dashboard
import EasyScheduling from './EasyScheduling';
import CalendarManager from './CalendarManager';
import ReminderManager from './ReminderManager';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />  {/* Add Dashboard Route */}
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/easy-scheduling" element={<EasyScheduling />} />
        <Route path="/calendar-manager" element={<CalendarManager />} />
        <Route path="/reminder-manager" element={<ReminderManager />} />
      </Routes>
    </Router>
  );
};

export default App;
