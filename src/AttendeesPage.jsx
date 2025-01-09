import React, { useState } from "react";
import "./AttendeesForm.css";

const AttendeesForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    response: "Pending",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value) {
          error = `${name === "firstName" ? "First" : "Last"} name cannot be empty.`;
        } else if (value.length < 3) {
          error = `${name === "firstName" ? "First" : "Last"} name must be at least 3 characters long.`;
        }
        break;
      case "email":
        if (!value) {
          error = "Email cannot be empty.";
        } else if (value.length > 64) {
          error = "Email cannot be more than 64 characters.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Enter a valid email address.";
        }
        break;
      case "phoneNumber":
        if (!value) {
          error = "Phone number cannot be empty.";
        } else if (value.length < 10) {
          error = "Phone number cannot be less than 10 digits.";
        } else if (value.length > 10) {
          error = "Phone number cannot be more than 10 digits.";
        } else if (!/^\d+$/.test(value)) {
          error = "Phone number must contain only digits.";
        }
        break;
      case "response":
        if (!["Pending", "Confirmed", "Declined"].includes(value)) {
          error = "Please select a valid response.";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error when the input changes
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Event Title</h2>

      <label className="form-label">First Name</label>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-input"
      />
      {errors.firstName && <span className="form-error">{errors.firstName}</span>}

      <label className="form-label">Last Name</label>
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-input"
      />
      {errors.lastName && <span className="form-error">{errors.lastName}</span>}

      <label className="form-label">Phone Number</label>
      <input
        type="text"
        name="phoneNumber"
        placeholder="(+27) 71 234 5678"
        value={formData.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-input"
      />
      {errors.phoneNumber && <span className="form-error">{errors.phoneNumber}</span>}

      <label className="form-label">Email</label>
      <input
        type="text"
        name="email"
        placeholder="username@domain.com"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-input"
      />
      {errors.email && <span className="form-error">{errors.email}</span>}

      <label className="form-label">Response</label>
      <select
        name="response"
        value={formData.response}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-select"
      >
        <option value="Pending">Pending</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Declined">Declined</option>
      </select>
      {errors.response && <span className="form-error">{errors.response}</span>}

      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
};

export default AttendeesForm;
