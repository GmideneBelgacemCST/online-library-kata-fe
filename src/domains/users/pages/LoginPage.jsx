import React, { useState } from "react";
import Notification from "../../../components/common/Notification";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({ message: "", type: "" });

    try {
      await login({ username, password }); // Call the login function
      setNotification({ message: "Login successful!", type: "success" });
      navigate("/home"); // Redirect to the home page
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed.";
      setNotification({ message: errorMsg, type: "error" });
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h1>Login</h1>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: "1rem",
            padding: "0.5rem",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: "1rem",
            padding: "0.5rem",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        First time?{" "}
        <Link
          to="/register"
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
