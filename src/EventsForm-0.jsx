import { useState } from 'react';
import './pinitappstyle.css';
import AddEventForm from './AddEventForm'; // Assume this is the AddEventForm component

function EventsForm() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [events, setEvents] = useState([]); // State to hold events
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleAddEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
    setIsFormVisible(false);
  };

  const handleDeleteEvent = (index) => {
    setEvents((prevEvents) => prevEvents.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <button className="hamburger" onClick={toggleDrawer}>
          &#9776;
        </button>
        <button className="notification">
          &#128276;
        </button>
      </header>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="drawer">
          <button className="close-drawer" onClick={toggleDrawer}>
            &times;
          </button>
          <ul className="drawer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <main className="container">
        <h1 className="header">My Events</h1>

        {/* Show events or empty state */}
        {events.length === 0 ? (
          <div className="empty-state">
            <div className="icon-container">
              <img
                className="empty-icon"
                src="path/to/your/image.png" // Replace with actual image path
                alt="Empty Icon"
              />
            </div>
            <p className="footerText">There is nothing to show here</p>
          </div>
        ) : (
          <div className="event-list">
            {events.map((event, index) => (
              <div key={index} className="event-item">
                <div className="event-header">
                  <span className="event-date">{event.date}</span>
                </div>
                <button className="event-button">
                  {event.title}
                </button>
                <div className="event-actions">
                  <button
                    className="button"
                    onClick={() => alert(`Edit event: ${event.title}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="button"
                    onClick={() => handleDeleteEvent(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="button"
                    onClick={() => alert(`Share event: ${event.title}`)}
                  >
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Event Form */}
        {isFormVisible && (
          <AddEventForm onSave={handleAddEvent} onCancel={() => setIsFormVisible(false)} />
        )}

        {/* Add New Button */}
        {!isFormVisible && (
          <button className="add-button" onClick={() => setIsFormVisible(true)}>
            Add New
          </button>
        )}
      </main>
    </div>
  );
}

export default EventsForm;
