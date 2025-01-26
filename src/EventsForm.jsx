import React, { useState, useRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { useNavigate, Link } from "react-router-dom";
import { FaRegEye, FaRegThumbsDown, FaRegThumbsUp  } from "react-icons/fa";
import "./PinitAppStyle.css";

const libraries = ["places"];

function EventForm() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleAddNew = () => {
    setIsCreatingEvent(true);
    setSelectedEvent(null);
  };

  const handleSaveEvent = (event) => {
    if (selectedEvent) {
      const updatedEvents = events.map((ev) =>
        ev.id === selectedEvent.id ? { ...selectedEvent, ...event } : ev
      );
      setEvents(updatedEvents);
    } else {
      if (event.title && event.date && event.location) {
        const newEvent = { ...event, id: Date.now(), createdAt: new Date() };
        setEvents([...events, newEvent]);
      }
    }
    setIsCreatingEvent(false);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsCreatingEvent(true);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
    setIsCreatingEvent(false);
  };

  const handleShareEvent = (event) => {
    const eventUrl = `${window.location.origin}/event/${event.id}`;
    const shareText = `Check out this event: ${event.title}\nDate: ${event.date}\nLocation: ${event.location}\nLink: ${eventUrl}`;
  
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: shareText,
          url: eventUrl,
        })
        .catch((err) => console.error("Sharing failed:", err));
    } else {
      alert(`Copy and share this link:\n\n${eventUrl}`);
    }
  };

  const handleViewAttendees = (event) => {
    navigate(`/attendeesform`, { state: { title: event.title, date: event.date } });
  };
  
  const handleNavigateToNotifications = () => {
    navigate("/notificationspage");
  };

  if (loadError) return <p>Error loading Google Maps API</p>;
  if (!isLoaded) return <p>Loading Google Maps API...</p>;

  return (
    <div className="app">
      <header className="header">
        <button className="hamburger" onClick={toggleDrawer}>
          &#9776;
        </button>
        <button
          className="notification"
          onClick={handleNavigateToNotifications}
        >
          &#128276;
        </button>
      </header>

      {isDrawerOpen && (
        <div className="drawer">
          <button className="close-drawer" onClick={toggleDrawer}>
            &times;
          </button>
          <ul className="drawer-links">
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/settingspage">Settings</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      )}

      {!isCreatingEvent ? (
        <div className="event-list-container">
        <header className="header">
          <h2 className="app-title">My Events</h2>
        </header>
        {events.length === 0 ? (
          <div className="empty-state">
            <div className="icon-container">
              <img
                className="empty-icon"
                src="\src\assets\empty-inbox.png"
                alt="Empty Icon"
              />
            </div>
            <p>
              There are no events yet.
              <br />
              Click "Add New" to create one!
            </p>
            <button className="add-button empty-state" onClick={handleAddNew}>
              Add New
            </button>
          </div>
        ) : (
          <div className="events-container">
            <button className="add-button event-state" onClick={handleAddNew}>
              Add New
            </button>
            <div className="events-list">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="event-card"
                  onClick={() => handleEditEvent(event)}
                >
                  <span className="event-created">
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    }).format(new Date(event.createdAt))}
                  </span>
                  <p className="event-title">{event.title}</p>
                  <div className="response-container">
                    <div>
                      <FaRegThumbsUp className="icon" />
                      <span>{event.confirmedCount || 0}</span>
                    </div>
                    <div>
                      <FaRegThumbsDown className="icon" />
                      <span>{event.declinedCount || 0}</span>
                    </div>
                    <div>
                      <FaRegEye className="icon" />
                      <span>{event.viewedCount || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>      
      ) : (
        <EventFormDetails
          event={selectedEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onShare={handleShareEvent}
          onCancel={() => setIsCreatingEvent(false)}
        />
      )}
    </div>
  );
}

function EventFormDetails({ event, onSave, onDelete, onShare, onCancel }) {
  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(event?.date || "");
  const [location, setLocation] = useState(event?.location || "");
  const [errors, setErrors] = useState({ title: "", date: "", location: "" });

  const locationInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!locationInputRef.current || !window.google) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      locationInputRef.current,
      {
        types: ["geocode"],
        componentRestrictions: { country: "za"},
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address) {
        setLocation(place.formatted_address);
        setErrors((prevErrors) => ({ ...prevErrors, location: "" }));
      }
    });
  }, []);

  const validate = (name, value) => {
    let error = "";
    const today = new Date();
    switch (name) {
      case "title":
        if (!value.trim()) error = "Title cannot be empty.";
        break;
      case "date":
        const selectedDate = new Date(value);
        if (!value) error = "Event date cannot be empty.";
        else if (selectedDate < today) error = "Event date must be in the future.";
        break;
      case "location":
        if (!value.trim()) error = "Location cannot be empty.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const error = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    if (name === "title") setTitle(value);
    else if (name === "date") setDate(value);
    else if (name === "location") setLocation(value);
  };

  const handleSave = () => {
    const titleError = validate("title", title);
    const dateError = validate("date", date);
    const locationError = validate("location", location);

    if (titleError || dateError || locationError) {
      setErrors({ title: titleError, date: dateError, location: locationError });
      return;
    }

    onSave({ title, date, location });
  };

  return (
    <div className="event-form-details">
      <button className="back-button" onClick={onCancel}>
        &#8592; Back
      </button>
      <h2 className="form-title">{event ? "Edit Event" : "New Event"}</h2>
      <label>
        Title
        <input type="text" name="title" value={title} onChange={handleFieldChange} />
        {errors.title && <p className="error-message">{errors.title}</p>}
      </label>
      <label>
        Date
        <input type="date" name="date" value={date} onChange={handleFieldChange} />
        {errors.date && <p className="error-message">{errors.date}</p>}
      </label>
      <label>
        Location
        <input
          type="text"
          name="location"
          ref={locationInputRef}
          value={location}
          onChange={handleFieldChange}
          placeholder="Enter location"
        />
        {errors.location && <p className="error-message">{errors.location}</p>}
      </label>
      <div className="button-group">
      <button
      className={`save-button ${!title || !date || !location ? "disabled" : "enabled"}`}
      onClick={handleSave}
      disabled={!title || !date || !location}
      >
        Save
      </button>
        {event && (
          <>
            <button className="delete-button" onClick={() => onDelete(event.id)}>
              Delete
            </button>
            <button className="share-button" onClick={() => onShare(event)}>
              Share
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EventForm;
