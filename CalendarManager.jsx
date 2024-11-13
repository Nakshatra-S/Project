import React, { useState } from 'react';
import './CalendarManager.css';

const CalendarManager = () => {
  const [meetings, setMeetings] = useState([
    { id: 1, title: 'Project Kick-off', date: '2024-11-01', time: '10:00 AM', location: 'Zoom', participants: 'client@company.com', type: 'Client', recurring: false },
    { id: 2, title: 'Internal Team Sync', date: '2024-11-03', time: '02:00 PM', location: 'Office HQ', participants: 'team@company.com', type: 'Internal', recurring: true },
  ]);

  const [newMeeting, setNewMeeting] = useState({
    title: '', date: '', time: '', location: '', participants: '', type: 'Internal', recurring: false, reminder: '15 minutes'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentMeetingId, setCurrentMeetingId] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting({ ...newMeeting, [name]: value });
  };

  // Add or edit meeting
  const handleMeetingSubmit = () => {
    if (editMode) {
      setMeetings(meetings.map(meeting => 
        meeting.id === currentMeetingId ? { ...meeting, ...newMeeting } : meeting
      ));
      setEditMode(false);
      setCurrentMeetingId(null);
    } else {
      setMeetings([...meetings, { id: meetings.length + 1, ...newMeeting }]);
    }
    resetForm();
  };

  // Delete meeting
  const deleteMeeting = (id) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
  };

  // Edit meeting
  const editMeeting = (id) => {
    const meeting = meetings.find(m => m.id === id);
    setNewMeeting({ ...meeting });
    setEditMode(true);
    setCurrentMeetingId(id);
  };

  // Reset form
  const resetForm = () => {
    setNewMeeting({ title: '', date: '', time: '', location: '', participants: '', type: 'Internal', recurring: false, reminder: '15 minutes' });
  };

  // Filter and search meetings
  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="calendar-container">
      <h2>Manage Your Calendar</h2>

      {/* Search and Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by Title or Type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Meeting Form */}
      <div className="meeting-form">
        <input
          type="text"
          name="title"
          placeholder="Meeting Title"
          value={newMeeting.title}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={newMeeting.date}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="time"
          value={newMeeting.time}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location (e.g., Zoom, Office)"
          value={newMeeting.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="participants"
          placeholder="Participants (comma-separated emails)"
          value={newMeeting.participants}
          onChange={handleInputChange}
        />

        {/* Meeting Type */}
        <select name="type" value={newMeeting.type} onChange={handleInputChange}>
          <option value="Internal">Internal</option>
          <option value="Client">Client</option>
          <option value="External">External</option>
        </select>

        {/* Recurring Meetings */}
        <div className="recurring-checkbox">
          <label>
            <input
              type="checkbox"
              name="recurring"
              checked={newMeeting.recurring}
              onChange={(e) => setNewMeeting({ ...newMeeting, recurring: e.target.checked })}
            />
            Recurring Meeting
          </label>
        </div>

        {/* Reminder Settings */}
        <select name="reminder" value={newMeeting.reminder} onChange={handleInputChange}>
          <option value="5 minutes">5 minutes before</option>
          <option value="15 minutes">15 minutes before</option>
          <option value="1 hour">1 hour before</option>
          <option value="1 day">1 day before</option>
        </select>

        <button className="add-meeting-btn" onClick={handleMeetingSubmit}>
          {editMode ? 'Update Meeting' : 'Add Meeting'}
        </button>
      </div>

      {/* Meetings List */}
      <div className="meetings-list">
        <h3>Upcoming Meetings</h3>
        <ul>
          {filteredMeetings.map(meeting => (
            <li key={meeting.id} className="meeting-item">
              <div className="meeting-info">
                <span className="meeting-title">{meeting.title}</span>
                <span>{meeting.date}</span>
                <span>{meeting.time}</span>
                <span>{meeting.location}</span>
                <span>{meeting.participants}</span>
                <span className={`meeting-type ${meeting.type.toLowerCase()}`}>{meeting.type}</span>
              </div>
              <div className="meeting-actions">
                <button className="edit-meeting-btn" onClick={() => editMeeting(meeting.id)}>Edit</button>
                <button className="delete-meeting-btn" onClick={() => deleteMeeting(meeting.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarManager;
