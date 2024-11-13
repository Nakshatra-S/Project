import React, { useState, useEffect } from 'react';
import './ReminderManger.css';
import { Link } from 'react-router-dom';

const ReminderManager = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    invitees: '',
    meetingType: 'Online',
    urgency: 'Medium',
    recurring: 'None',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    // Sort reminders by date and time
    const sortedReminders = [...reminders].sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
    setReminders(sortedReminders);
  }, [reminders]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReminder({ ...newReminder, [name]: value });
  };

  // Add a new reminder with validation
  const addReminder = () => {
    if (!newReminder.title || !newReminder.date || !newReminder.time) {
      setError('Please fill in the required fields.');
      setTimeout(() => setError(''), 3000);  // Clear error message after 3 seconds
      return;
    }

    setReminders([
      ...reminders,
      { id: reminders.length + 1, ...newReminder }
    ]);

    setNewReminder({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      invitees: '',
      meetingType: 'Online',
      urgency: 'Medium',
      recurring: 'None',
    });

    setSuccessMessage('Meeting reminder added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);  // Clear success message after 3 seconds
  };

  // Delete a reminder with fade-out effect
  const deleteReminder = (id) => {
    document.getElementById(`reminder-${id}`).classList.add('fade-out');
    setTimeout(() => {
      setReminders(reminders.filter(reminder => reminder.id !== id));
      setSuccessMessage('Reminder deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 500);
  };

  // Filter reminders based on search term and filterType
  const filteredReminders = reminders.filter(reminder => {
    return (
      (reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) || reminder.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterType === '' || reminder.meetingType === filterType)
    );
  });

  return (
    <div className="reminder-container">
      <h2>Manage Meeting Reminders</h2>

      {/* Error and Success Messages */}
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Add Reminder Form */}
      <div className="reminder-form">
        <input
          type="text"
          name="title"
          placeholder="Meeting Title *"
          value={newReminder.title}
          onChange={handleInputChange}
          className={newReminder.title ? '' : 'input-error'}
        />
        <textarea
          name="description"
          placeholder="Meeting Description"
          value={newReminder.description}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="date"
          name="date"
          value={newReminder.date}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="time"
          value={newReminder.time}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newReminder.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="invitees"
          placeholder="Invitees (comma-separated)"
          value={newReminder.invitees}
          onChange={handleInputChange}
        />

        {/* Meeting Type and Urgency */}
        <select name="meetingType" value={newReminder.meetingType} onChange={handleInputChange}>
          <option value="Online">Online</option>
          <option value="In-Person">In-Person</option>
        </select>
        <select name="urgency" value={newReminder.urgency} onChange={handleInputChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Recurring Options */}
        <select name="recurring" value={newReminder.recurring} onChange={handleInputChange}>
          <option value="None">None</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>

        <button className="add-reminder-btn" onClick={addReminder}>
          Add Reminder
        </button>
      </div>

      {/* Search and Filter */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search meetings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All</option>
          <option value="Online">Online</option>
          <option value="In-Person">In-Person</option>
        </select>
      </div>

      {/* List of reminders */}
      <div className="reminders-list">
        <h3>Upcoming Meetings</h3>
        <ul>
          {filteredReminders.map(reminder => (
            <li key={reminder.id} id={`reminder-${reminder.id}`} className="reminder-item fade-in">
              <div className="reminder-info">
                <h4>{reminder.title}</h4>
                <p>{reminder.description}</p>
                <p><strong>Date:</strong> {reminder.date} at {reminder.time}</p>
                <p><strong>Location:</strong> {reminder.location}</p>
                <p><strong>Invitees:</strong> {reminder.invitees}</p>
                <p><strong>Type:</strong> {reminder.meetingType}</p>
                <p><strong>Urgency:</strong> {reminder.urgency}</p>
              </div>
              <button className="delete-reminder-btn" onClick={() => deleteReminder(reminder.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReminderManager;
