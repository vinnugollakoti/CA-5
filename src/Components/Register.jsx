import { useState } from "react";

const Register = () => {
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [validSuccess, setValidSuccess] = useState(false);
  const [spaceError, setSpaceError] = useState(false);
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
  };

  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
    setTermsError(false); // Reset terms error when checkbox is checked/unchecked
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = [];

    const { firstName, lastName, email, password, repeatPassword } = data;

    // Check for empty fields or spaces
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      repeatPassword.trim() === "" ||
      email.includes(" ")
    ) {
      errors.push("Please fill in all fields and make sure there are no spaces.");
    }

    // Check name length constraints
    if (firstName.length < 3 || firstName.length > 30) {
      errors.push("First name should be between 3 and 30 characters long.");
    }

    if (lastName.length < 3 || lastName.length > 30) {
      errors.push("Last name should be between 3 and 30 characters long.");
    }

    // Check for valid email format
    if (!email.includes("@")) {
      errors.push("Enter a valid email address.");
    }

    // Check password length and special character constraints
    if (password.length < 10 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password should be at least 10 characters long and contain at least one special character.");
    }

    // Check if repeat password matches password
    if (password !== repeatPassword) {
      errors.push("Passwords do not match.");
    }

    // Check if terms are accepted
    if (!termsAccepted) {
      setTermsError(true);
      errors.push("Please accept the terms and services.");
    }

    // Update error states
    setFirstNameError(firstName.length < 3 || firstName.length > 30);
    setLastNameError(lastName.length < 3 || lastName.length > 30);
    setEmailError(!email.includes("@"));
    setPasswordError(password.length < 10 || !/[!@#$%^&*(),.?":{}|<>]/.test(password));
    setRepeatPasswordError(password !== repeatPassword);
    setSpaceError(errors.length > 0);

    // If there are no errors, set validSuccess to true
    if (errors.length === 0) {
      setValidSuccess(true);
      alert("Congratulations! You have registered successfully.");
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
          </div>
          {firstNameError && <p className="error">First name should be between 3 and 30 characters long.</p>}
          {spaceError && !data.firstName.trim() && <p className="error">Please enter your first name.</p>}

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
          </div>
          {lastNameError && <p className="error">Last name should be between 3 and 30 characters long.</p>}
          {spaceError && !data.lastName.trim() && <p className="error">Please enter your last name.</p>}

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
          </div>
          {emailError && <p className="error">Enter a valid email address.</p>}
          {spaceError && !data.email.trim() && <p className="error">Please enter your email address.</p>}

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
          </div>
          {passwordError && (
            <p className="error">
              Password should be at least 10 characters long and contain at least one special character.
            </p>
          )}
          {spaceError && !data.password.trim() && <p className="error">Please enter your password.</p>}

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
          </div>
          {repeatPasswordError && <p className="error">Passwords do not match.</p>}
          {spaceError && !data.repeatPassword.trim() && <p className="error">Please confirm your password.</p>}

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
          </div>
          {termsError && <p className="error">Please accept the terms and services.</p>}

          <button
            className="submit"
            type="submit"
            disabled={
              firstNameError ||
              lastNameError ||
              emailError ||
              passwordError ||
              repeatPasswordError ||
              spaceError ||
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
