import React, { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
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

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleAddNew = () => {
    setIsCreatingEvent(true);
    setSelectedEvent(null); // Clear any selected event when adding a new one
  };

  const handleSaveEvent = (event) => {
    if (selectedEvent) {
      // Update existing event
      const updatedEvents = events.map((ev) =>
        ev.id === selectedEvent.id ? { ...selectedEvent, ...event } : ev
      );
      setEvents(updatedEvents);
    } else {
      // Add new event only if it's valid
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
    const shareText = `Check out this event: ${event.title}\nDate: ${event.date}\nLocation: ${event.location}`;

    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: shareText,
          url: window.location.href,
        })
        .catch((err) => console.error("Sharing failed:", err));
    } else {
      alert(
        `Your browser doesn't support sharing. Here is the event info:\n\n${shareText}`
      );
    }
  };

  if (loadError) return <p>Error loading Google Maps API</p>;
  if (!isLoaded) return <p>Loading Google Maps API...</p>;

  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <button className="hamburger" onClick={toggleDrawer}>
          &#9776;
        </button>
        <button className="notification">&#128276;</button>
      </header>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="drawer">
          <button className="close-drawer" onClick={toggleDrawer}>
            &times;
          </button>
          <ul className="drawer-links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      {!isCreatingEvent ? (
        <div className="event-list-container">
          <header className="header">
            <h2 className="app-title">My Events</h2>
            <button className="add-button" onClick={handleAddNew}>
              Add New
            </button>
          </header>
          {events.length === 0 ? (
            <div className="empty-state">
              <p>There are no events yet. Click "Add New" to create one!</p>
            </div>
          ) : (
            <div className="events-list">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="event-card"
                  onClick={() => handleEditEvent(event)}
                >
                  <span className="event-created">
                    {new Date(event.createdAt).toLocaleDateString()}
                  </span>
                  <p className="event-title">{event.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <EventFormDetails
          event={selectedEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onShare={handleShareEvent}
          onCancel={() => setIsCreatingEvent(false)} // Allow user to cancel
        />
      )}
    </div>
  );
}

function EventFormDetails({ event, onSave, onDelete, onShare, onCancel }) {
  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(event?.date || "");
  const [location, setLocation] = useState(event?.location || "");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [errors, setErrors] = useState({
    title: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    if (!window.google) return; // Ensure google is available

    const input = document.getElementById("location-input");
    const autocomplete = new window.google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setLocation(place.formatted_address);
      }
    });
  }, []);

  const validate = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (!value.trim()) {
          error = "Title cannot be empty.";
        }
        break;

      case "date":
        const selectedDate = new Date(value);
        const today = new Date();
        if (!value) {
          error = "Event date cannot be empty.";
        } else if (selectedDate < today) {
          error = "Event date must be in the future.";
        }
        break;

      case "location":
        if (!value.trim()) {
          error = "Location cannot be empty.";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const error = validate(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    if (name === "title") {
      setTitle(value);
    } else if (name === "date") {
      setDate(value);
    } else if (name === "location") {
      setLocation(value);
    }
  };

  const handleSave = () => {
    // Validate all fields
    const titleError = validate("title", title);
    const dateError = validate("date", date);
    const locationError = validate("location", location);

    if (titleError || dateError || locationError) {
      setErrors({
        title: titleError,
        date: dateError,
        location: locationError,
      });
      return; // Prevent saving
    }

    if (title && date && location) {
      const eventData = {
        title,
        date,
        location,
        createdAt: new Date().toLocaleString(),
      };

      onSave(eventData);
    }
  };

  return (
    <div className="event-form-details">
      <button className="back-button" onClick={onCancel}>
        &#8592; Back
      </button>
      <h2 className="form-title">{event ? "Edit Event" : "New Event"}</h2>
      <label>
        Title
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleFieldChange}
        />
        {errors.title && <p className="error-message">{errors.title}</p>}
      </label>
      <label>
        Date
        <input
          type="date"
          name="date"
          value={date}
          onChange={handleFieldChange}
        />
        {errors.date && <p className="error-message">{errors.date}</p>}
      </label>
      <label>
        Location
        <input
          id="location-input"
          type="text"
          name="location"
          value={location}
          onChange={handleFieldChange}
          placeholder="Enter location"
        />
        {errors.location && <p className="error-message">{errors.location}</p>}
      </label>
      <div className="button-group">
        <button
          className="save-button"
          onClick={handleSave}
          disabled={!title || !date || !location}
        >
          Save
        </button>
        {event && (
          <>
            <button
              className="delete-button"
              onClick={() => onDelete(event.id)}
            >
              Delete
            </button>
            <button
              className="share-button"
              onClick={() => onShare(event)}
            >
              Share
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EventForm;
