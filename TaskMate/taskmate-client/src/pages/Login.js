import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password || (isRegistering && !form.name)) {
      alert("Please fill out all required fields");
      return;
    }

    alert(isRegistering ? "Account created (mock)" : "Logged in (mock)");

    sessionStorage.setItem(
      "user",
      JSON.stringify({ name: form.name || "User", email: form.email })
    );

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegistering ? "Create Account" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
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
          <button type="submit">
            {isRegistering ? "Create Account" : "Login"}
          </button>
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
