import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        await api.post("/auth/signin", formData);
        alert("Signup successful 🎉 Please login");
        setIsSignup(false);
      } else {
        await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        alert("Login successful 🎉");
        navigate("/home");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <section className="signin-bg">
      <div className="signin-card">
        <h1>{isSignup ? "Create Account" : "Login"}</h1>

        <form onSubmit={handleSubmit}>
          <input name="email" onChange={handleChange} placeholder="Email" />
          <input name="password" type="password" onChange={handleChange} placeholder="Password" />

          {isSignup && (
            <input
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          )}

          <button type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Login" : "Sign Up"}
        </p>
      </div>
    </section>
  );
};

export default Signin;