// Signin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // ✅ Make sure api.js has your backend URL
import "./signin.css";

const Signin = () => {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.endsWith("@gmail.com")) {
      alert("Use a valid Gmail address");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      if (isSignup) {
        // 🔹 SIGNUP
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        const res = await api.post("/auth/signin", {
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });

        alert(res.data.message); // "Signup successful"
        setIsSignup(false);
        setFormData({ email: "", password: "", confirmPassword: "" });
      } else {
        // 🔹 LOGIN
        const res = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        alert(res.data.message); // "Login successful"
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <section className="signin-bg">
      <div className="signin-card">
        <h1 className="signin-title">
          {isSignup ? "Create Account ✨" : "Welcome Back 👋"}
        </h1>

        <p className="signin-subtitle">
          {isSignup ? "Sign up to get started" : "Login to continue"}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="📧 Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="🔁 Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* 🔁 TOGGLE */}
        <p style={{ marginTop: "15px", color: "#fff" }}>
          {isSignup ? "Already have an account?" : "New user?"}{" "}
          <span
            style={{ color: "#facc15", cursor: "pointer" }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </section>
  );
};

export default Signin;