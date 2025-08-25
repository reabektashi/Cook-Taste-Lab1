import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/Css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    setEmailError("");
    setPasswordError("");
    let valid = true;

    if (!email) {
      setEmailError("Please enter an email!");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email!");
      valid = false;
    }

    if (!password) {
      setPasswordError("Please enter a password!");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters!");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.message || "Login failed");
        return;
      }

      // Ruaj të dhënat në localStorage
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("email", data.user.email);

      // Redirekto sipas rolit
      if (data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setPasswordError("Server error");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="error-message">{emailError}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="error-message">{passwordError}</div>
          </div>

          <div className="form-group">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <button type="submit" className="btn">Login</button>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
