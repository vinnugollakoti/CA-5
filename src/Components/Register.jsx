import React, { useState } from "react";

const Register = () => {
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [termsError, setTermsError] = useState(false); // New state variable for terms checkbox
  const [termsAccepted, setTermsAccepted] = useState(false); // New state variable to track checkbox state
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleSetState = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));

    // Clear error when user corrects input
    switch (name) {
      case "firstName":
        setFirstNameError(false);
        break;
      case "lastName":
        setLastNameError(false);
        break;
      case "email":
        setEmailError(false);
        break;
      case "password":
        setPasswordError(false);
        break;
      case "repeatPassword":
        setRepeatPasswordError(false);
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
    setTermsError(false); // Reset terms error when checkbox is checked/unchecked
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = [];

    const { firstName, lastName, email, password, repeatPassword } = data;

    // Check name length constraints
    if (firstName.length < 3 || firstName.length > 30) {
      setFirstNameError(true);
      errors.push("First name should be between 3 and 30 characters long.");
    }

    if (lastName.length < 3 || lastName.length > 30) {
      setLastNameError(true);
      errors.push("Last name should be between 3 and 30 characters long.");
    }

    // Check for valid email format
    if (!email.includes("@")) {
      setEmailError(true);
      errors.push("Enter a valid email address.");
    }

    // Check password length and special character constraints
    if (password.length < 10 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError(true);
      errors.push("Password should be at least 10 characters long and contain at least one special character.");
    }

    // Check if repeat password matches password
    if (password !== repeatPassword) {
      setRepeatPasswordError(true);
      errors.push("Passwords do not match.");
    }

    // Check if terms are accepted
    if (!termsAccepted) {
      setTermsError(true);
      errors.push("Please accept the terms and services.");
    }

    // If there are no errors, log the data object and reset form
    if (errors.length === 0) {
      console.log(data); // Print data object to the console
      alert("Congratulations! You have registered successfully.");

      // Reset form and state
      setData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
      });
      setTermsAccepted(false);
    }
  };

  return (
    <div className="major">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="title">Welcome to kalvium books</div>
          <div className="subtitle">start creating your account!</div>

          <div className="second-container ic1">
            <input
              placeholder="First Name"
              type="text"
              className="second"
              id="firstname"
              name="firstName"
              value={data.firstName}
              onChange={handleSetState}
            />
            {firstNameError && <p className="error">First name should be between 3 and 30 characters long.</p>}
          </div>

          <div className="second-container ic2">
            <input
              placeholder="Last name"
              type="text"
              className="second"
              id="lastname"
              name="lastName"
              value={data.lastName}
              onChange={handleSetState}
            />
            {lastNameError && <p className="error">Last name should be between 3 and 30 characters long.</p>}
          </div>

          <div className="second-container ic2">
            <input
              placeholder="Email"
              type="text"
              className="second"
              id="email"
              name="email"
              value={data.email}
              onChange={handleSetState}
            />
            {emailError && <p className="error">Enter a valid email address.</p>}
          </div>

          <div className="second-container ic2">
            <input
              placeholder="Password"
              type="password"
              className="second"
              id="password"
              name="password"
              value={data.password}
              onChange={handleSetState}
            />
            {passwordError && <p className="error">Password should be at least 10 characters long and contain at least one special character.</p>}
          </div>

          <div className="second-container ic2">
            <input
              placeholder="Confirm password"
              type="password"
              className="second"
              id="repeatPassword"
              name="repeatPassword"
              value={data.repeatPassword}
              onChange={handleSetState}
            />
            {repeatPasswordError && <p className="error">Passwords do not match.</p>}
          </div>

          <div className="checkbox-box">
            <input
              type="checkbox"
              className="checkbox"
              id="terms"
              name="terms"
              checked={termsAccepted}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="terms">
              I agree all statements in <a>Terms of service</a>
            </label>
            {termsError && <p className="error">Please accept the terms and services.</p>}
          </div>

          <button
            className="submit"
            type="submit"
            disabled={
              firstNameError ||
              lastNameError ||
              emailError ||
              passwordError ||
              repeatPasswordError ||
              !termsAccepted
            }
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
