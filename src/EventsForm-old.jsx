import { useState } from 'react';
import './EventsForm.css';

function EventForm() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <button className="hamburger" onClick={toggleDrawer}>
          &#9776;
        </button>
        {/* <h1 className="header">My Events</h1> */}
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
      <h2 className="header">My Events</h2>
        <div className="empty-state">

          <div className="icon-container">
          <img
          className="empty-icon"
          src="\src\assets\empty-inbox.png"
          alt="Empty Icon"
          />
          </div>
          <p className="footerText">There is nothing to show here</p>
        </div>
        <button className="add-button">Add New</button>
      </main>
    </div>
  );
}

export default EventForm;
