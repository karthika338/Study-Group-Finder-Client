import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.endsWith("@gmail.com")) {
      alert("Use a valid Gmail address");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔹 SIGN UP
    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const userExists = users.find(
        (u) => u.email === formData.email
      );

      if (userExists) {
        alert("User already exists ❌");
        return;
      }

      users.push({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("users", JSON.stringify(users));

      alert("Signup successful 🎉 Please login");
      setIsSignup(false);
      setFormData({ email: "", password: "", confirmPassword: "" });
      return;
    }

    // 🔹 LOGIN
    const validUser = users.find(
      (u) =>
        u.email === formData.email &&
        u.password === formData.password
    );

    if (validUser) {
      alert("Login successful 🎉");
      navigate("/home");
    } else {
      alert("Invalid email or password ❌");
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
          />

          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            value={formData.password}
            onChange={handleChange}
          />

          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="🔁 Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
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
