import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!form.email || !form.password || (isRegistering && (!form.firstName || !form.lastName))) {
      alert("Please fill out all required fields");
      return;
    }

    try {
      // Use full backend URL here:
      const endpoint = isRegistering
        ? "http://localhost:8000/api/users/register"
        : "http://localhost:8000/api/users/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error occurred");
        return;
      }

      // Save user data in sessionStorage, include userId returned by backend
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          userId: data.userId,
        })
      );

      navigate("/dashboard");
    } catch (error) {
      alert("Network error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegistering ? "Create Account" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isRegistering ? "Create Account" : "Login"}</button>
        </form>
        <p>
          {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="toggle-button"
          >
            {isRegistering ? "Login" : "Create Account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
