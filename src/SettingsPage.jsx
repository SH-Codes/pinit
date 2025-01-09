import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    playNotificationSound: true,
    showNotificationTimestamp: true,
    showNumberOfNotifications: true,
    confirmDeletion: true,
    darkMode: false,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const navigate = useNavigate();

  return (
    <div className="settings-container">
      <button className="settings-back-button" onClick={() => navigate(-1)}> 
        &larr; Back</button>
      <h1 className="settings-title">Settings</h1>
      <div className="settings-options">
        {[
          { label: "Play notification sound", key: "playNotificationSound" },
          { label: "Show notification timestamp", key: "showNotificationTimestamp" },
          { label: "Show number of notifications", key: "showNumberOfNotifications" },
          { label: "Confirm deletion", key: "confirmDeletion" },
          { label: "Turn on dark mode", key: "darkMode" },
        ].map(({ label, key }) => (
          <div key={key} className="settings-option-row">
            <span className="option-label">{label}</span>
            <button
              onClick={() => toggleSetting(key)}
              className={`toggle-button ${settings[key] ? "active" : ""}`}
            >
              <div className="toggle-circle" />
            </button>
          </div>
        ))}
      </div>
      <button className="sign-out-button">Sign Out</button>
    </div>
  );
};

export default Settings;
