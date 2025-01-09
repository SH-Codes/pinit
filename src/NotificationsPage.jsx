import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";

const NotificationPage = () => {
  // State for notifications (initially empty for testing empty state)
  const [notifications, setNotifications] = useState([
    {
      title: "Christmas Lunch",
      description: "Andile Ndlovu will be attending the Christmas Lunch event",
      time: "5 secs ago",
    },
    {
      title: "Christmas Lunch",
      description: "Andile Ndlovu will be attending the Christmas Lunch event",
      time: "1 mins ago",
    },
    {
      title: "Christmas Lunch",
      description: "Siyanda Ntuli will be attending the Christmas Lunch event",
      time: "11 mins ago",
    },
    {
      title: "Christmas Lunch",
      description: "Thandeka Ntuli will be attending the Christmas Lunch event",
      time: "1 hour ago",
    },
    {
      title: "Family Fun Fair",
      description: "Andile Ndlovu will be attending the Christmas Lunch event",
      time: "1 week ago",
    },
  ]);

  // Initialize navigate function from React Router
  const navigate = useNavigate();

  return (
    <div className="notifications-container">
      {/* Header */}
      <div className="header">
        <button className="notifications-back-button" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
      </div>

      {/* Title */}
      <h1 className="notifications-main-title">Notifications</h1>

      {/* Conditional Rendering for Empty State or Notifications */}
      {notifications.length === 0 ? (
        <div className="empty-state">
          <img
            src="src/assets/notification.png"
            alt="No notifications"
            className="notifications-empty-image"
          />
          <p className="notifications-empty-text">No Notifications</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-card">
              <div className="notification-header">
                <span className="notification-title">
                  {notification.title}
                </span>
                <span className="notification-time">{notification.time}</span>
              </div>
              <p className="notification-description">
                {notification.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
