import { useState } from "react";
// import { Link } from "react-router-dom";
import "./PinitAppStyle.css";

const RecoveryForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value) {
          error = "Email cannot be empty.";
        } else if (value.length > 64) {
          error = "Email cannot be more than 64 characters.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Enter a valid email address.";
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
    } else {
      setErrors(newErrors);
    }
  };

  // Calculate if the form is valid
  const isFormValid =
    Object.keys(errors).length === 0 && formData.email && formData.password;

  return (
    <div className="container">
      <h2 className="header">Reset Password</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="label">Recovery Email</label>
        <input
          type="email"
          name="email"
          placeholder="username@domain.com"
          className="input"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <button type="submit" className="button" disabled={!isFormValid}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default RecoveryForm;