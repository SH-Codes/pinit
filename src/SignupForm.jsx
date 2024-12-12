import { Link } from "react-router-dom";
import { useState } from "react";
import "./PinitAppStyle.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
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

  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.confirmEmail &&
    formData.password &&
    formData.confirmPassword &&
    formData.email === formData.confirmEmail &&
    formData.password === formData.confirmPassword;

  return (
    <div className="container">
      <h2 className="header">Create an Account</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="label">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          placeholder="First Name"
          className="input"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <label htmlFor="lastName" className="label">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="input"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <label htmlFor="email" className="label">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="username@domain.com"
          className="input"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="confirmEmail" className="label">Confirm Email</label>
        <input
          id="confirmEmail"
          type="email"
          name="confirmEmail"
          placeholder="Confirm Email"
          className="input"
          value={formData.confirmEmail}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.confirmEmail && <p className="error">{errors.confirmEmail}</p>}

        <label htmlFor="password" className="label">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label htmlFor="confirmPassword" className="label">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        <button type="submit" className="button" disabled={!isFormValid}>
          Sign Up
        </button>
      </form>
      <p className="footerText">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignupForm;