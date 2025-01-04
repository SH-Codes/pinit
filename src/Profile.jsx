import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PinitAppStyle.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

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
      case "confirmEmail":
        if (!value) {
          error = "Confirm email cannot be empty.";
        } else if (value !== formData.email) {
          error = "Emails do not match.";
        }
        break;
      case "password":
        if (!value) {
          error = "Password cannot be empty.";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters long.";
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "Confirm password cannot be empty.";
        } else if (value !== formData.password) {
          error = "Passwords do not match.";
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

    // Clear errors on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      alert("Profile updated successfully!");
    } else {
      setErrors(newErrors);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="profile-container">
      <div className="header">
        <button className="back-button" onClick={handleBack} aria-label="Go Back">
          &larr; Back
        </button>
      </div>
      <div className="profile-header">
        <div className="profile-image">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-preview" />
          ) : (
            <span className="placeholder">Photo</span>
          )}
          <input
            type="file"
            accept="image/*"
            className="image-upload"
            onChange={handleImageChange}
          />
        </div>
        <h2 className="profile-name">
          {formData.firstName || formData.lastName
            ? `${formData.firstName} ${formData.lastName}`.trim()
            : "Your Name Here"}
        </h2>
      </div>

      <h3 className="section-header">Profile</h3>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          placeholder="First Name"
          className="input"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-label="First Name"
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="input"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-label="Last Name"
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="username@domain.com"
          className="input"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-label="Email Address"
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="confirmEmail">Confirm Email</label>
        <input
          id="confirmEmail"
          type="email"
          name="confirmEmail"
          placeholder="Confirm Email"
          className="input"
          value={formData.confirmEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-label="Confirm Email"
        />
        {errors.confirmEmail && <span className="error">{errors.confirmEmail}</span>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-label="Password"
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-label="Confirm Password"
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}

        <button type="submit" className="save-profile-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
