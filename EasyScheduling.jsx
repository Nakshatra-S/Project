import React, { useState } from 'react';
import './EasyScheduling.css';

const EasyScheduling = () => {
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingType, setMeetingType] = useState('Normal'); // Changed to 'Normal'
  const [location, setLocation] = useState('');
  const [platform, setPlatform] = useState('Zoom');
  const [participants, setParticipants] = useState('');
  const [meetingDetails, setMeetingDetails] = useState('');
  const [reminder, setReminder] = useState('15 minutes');
  const [recurring, setRecurring] = useState('None');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleScheduleMeeting = (e) => {
    e.preventDefault();

    // Basic validation
    if (!meetingDate || !meetingTime || !participants || !meetingDetails || (meetingType === 'In-Person' && !location)) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmails(participants)) {
      setError('Please enter valid email addresses.');
      return;
    }

    // Assume successful scheduling
    setError('');
    setSuccessMessage('Meeting scheduled successfully!');

    // Reset form
    setMeetingDate('');
    setMeetingTime('');
    setMeetingType('Normal');
    setLocation('');
    setPlatform('Zoom');
    setParticipants('');
    setMeetingDetails('');
    setReminder('15 minutes');
    setRecurring('None');
  };

  const validateEmails = (emails) => {
    const emailList = emails.split(',').map(email => email.trim());
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailList.every(email => emailPattern.test(email));
  };

  return (
    <div className="scheduling-container">
      <h1>Easy Scheduling</h1>
      <p>Schedule your meetings effortlessly with professional options.</p>

      <form className="scheduling-form" onSubmit={handleScheduleMeeting}>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="input-group">
          <label htmlFor="meeting-date">Meeting Date <span>*</span></label>
          <input 
            type="date" 
            id="meeting-date" 
            value={meetingDate} 
            onChange={(e) => setMeetingDate(e.target.value)} 
          />
        </div>

        <div className="input-group">
          <label htmlFor="meeting-time">Meeting Time <span>*</span></label>
          <input 
            type="time" 
            id="meeting-time" 
            value={meetingTime} 
            onChange={(e) => setMeetingTime(e.target.value)} 
          />
        </div>

        <div className="input-group">
          <label htmlFor="meeting-type">Meeting Type <span>*</span></label>
          <select
            id="meeting-type"
            value={meetingType}
            onChange={(e) => setMeetingType(e.target.value)}
          >
            <option value="Normal">Normal</option>
            <option value="Professional">Professional</option> {/* Added Professional */}
          </select>
        </div>

        {meetingType === 'In-Person' && (
          <div className="input-group">
            <label htmlFor="location">Meeting Location <span>*</span></label>
            <input 
              type="text" 
              id="location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="Enter location"
            />
          </div>
        )}

        {meetingType === 'Professional' && (
          <div className="input-group">
            <label htmlFor="platform">Select Platform</label>
            <select
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="Zoom">Zoom</option>
              <option value="Google Meet">Google Meet</option>
              <option value="Microsoft Teams">Microsoft Teams</option>
            </select>
          </div>
        )}

        <div className="input-group">
          <label htmlFor="participants">Invite Participants (Emails) <span>*</span></label>
          <input 
            type="text" 
            id="participants" 
            value={participants} 
            onChange={(e) => setParticipants(e.target.value)} 
            placeholder="Enter participant emails separated by commas" 
          />
        </div> 
        <div className="input-group">
          <label htmlFor="meeting-details">Meeting Details <span>*</span></label>
          <textarea 
            id="meeting-details" 
            value={meetingDetails} 
            onChange={(e) => setMeetingDetails(e.target.value)} 
            placeholder="Provide agenda or meeting details"
          ></textarea>
        </div>

        <div className="input-group">
          <label htmlFor="reminder">Reminder</label>
          <select
            id="reminder"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
          >
            <option value="15 minutes">15 minutes before</option>
            <option value="30 minutes">30 minutes before</option>
            <option value="1 hour">1 hour before</option>
            <option value="1 day">1 day before</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="recurring">Recurring</label>
          <select
            id="recurring"
            value={recurring}
            onChange={(e) => setRecurring(e.target.value)}
          >
            <option value="None">None</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <button type="submit" className="schedule-btn">Schedule Meeting</button>
      </form>
    </div>
  );
};

export default EasyScheduling;
