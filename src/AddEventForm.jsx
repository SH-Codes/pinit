import { useState, useRef } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import "./PinitAppStyle.css";

const libraries = ["places"];
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


const AddEventForm = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
    libraries,
  });

  const autocompleteRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    date: "",
    location: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name, value) => {
    let error = "";
  
    switch (name) {
      case "title": {
        if (!value.trim()) {
          error = "Title cannot be empty.";
        }
        break;
      }
  
      case "date": {
        const selectedDate = new Date(value);
        const today = new Date();
        if (!value) {
          error = "Event date cannot be empty.";
        } else if (selectedDate < today) {
          error = "Event date must be in the future.";
        }
        break;
      }
  
      case "location": {
        if (!value.trim()) {
          error = "Location cannot be empty.";
        }
        break;
      }
  
      default:
        break;
    }
  
    return error;
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    checkFormValidity();
  };

  const handleLocationChange = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address) {
        const location = place.formatted_address;
        setFormData((prevData) => ({
          ...prevData,
          location,
        }));

        const error = validateField("location", location);
        setErrors((prevErrors) => ({
          ...prevErrors,
          location: error,
        }));

        checkFormValidity();
      }
    }
  };

  const checkFormValidity = () => {
    const isValid =
      !errors.title &&
      !errors.date &&
      !errors.location &&
      formData.title &&
      formData.date &&
      formData.location;
    setIsFormValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert("Event saved successfully!");
      console.log("Form Data: ", formData);
      // Logic to save the form data goes here
    }
  };

  const handleClear = () => {
    setFormData({
      title: "",
      date: "",
      location: "",
    });
    setErrors({});
    setIsFormValid(false);
  };

  return (
    <div className="container">
      <h2 className="header">Add an Event</h2>
      <form className="form" onSubmit={handleSubmit}>
        {/* Title */}
        <label className="label">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Add Title"
          className="input"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}

        {/* Event Date */}
        <label className="label">Date</label>
        <input
          type="date"
          name="date"
          className="input"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <p className="error">{errors.date}</p>}

        {/* Location */}
        <label className="label">Location</label>
        {isLoaded ? (
          <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handleLocationChange}>
            <input
              type="text"
              name="location"
              placeholder="Add Location"
              className="input"
              value={formData.location}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  location: e.target.value,
                }))
              }
            />
          </Autocomplete>
        ) : (
          <p>Loading maps...</p>
        )}
        {errors.location && <p className="error">{errors.location}</p>}

        {/* Buttons */}
        <button type="button" className="button" onClick={handleClear}>
          Clear
        </button><br></br>
        <button type="submit" className="button" disabled={!isFormValid}>
          Save
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;
