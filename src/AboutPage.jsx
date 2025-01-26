import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import "./About.css";

const AboutPage = () => {

  const navigate = useNavigate();

  return (
    <div className="about-page">
      <button className="about-back-button" onClick={() => navigate(-1)}>
        <span>&larr; Back</span>
      </button>
      <h1>About</h1>
      <div className="app-info">
        <h2 className="about-app-title">
          Pinit<span className="dot">.</span>
        </h2>
        <p className="app-version">version 0.5.0</p>
        <p className="app-description">
          Pinit App is your all-in-one event management solution. Effortlessly
          create, manage, and share captivating event invitations with your
          loved ones, friends, and colleagues.
        </p>
      </div>
      <div className="key-features">
        <h3>Key Features:</h3>
        <ul>
          <li>
            <strong>Effortless Event Creation:</strong> Easily design stunning
            invitations for any occasion.
          </li>
          <li>
            <strong>Centralized Management:</strong> Keep track of all your
            event details in one place.
          </li>
          <li>
            <strong>Effortless Sharing:</strong> Seamlessly share invitations
            across various platforms.
          </li>
          <li>
            <strong>Real-time Insights:</strong> Track guest RSVPs and view the
            number of people who have accessed your event link.
          </li>
        </ul>
      </div>
      <div className="contact-info">
        <p>
          <FaEnvelope className="icon" />
          support@pinit.com
        </p>
        <p>
          <FaPhoneAlt className="icon" />
          (+27) 65 928 9981
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
