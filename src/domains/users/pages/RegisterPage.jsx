import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../../../components/common/Notification";
import { registerUser } from "../services/usersService";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
    });

    const [notification, setNotification] = useState({ message: "", type: "" });
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setNotification({ message: "", type: "" });

        if (!formData.username || !formData.password || !formData.name || !formData.email || !formData.phone) {
            setNotification({ message: "All fields are required.", type: "error" });
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            setNotification({ message: "Invalid email format.", type: "error" });
            return;
        }

        if (!/^\d{10,15}$/.test(formData.phone)) {
            setNotification({ message: "Phone number must be 10-15 digits.", type: "error" });
            return;
        }

        try {
            await registerUser(formData); 
            setNotification({ message: "Registration successful!", type: "success" });
            setTimeout(() => navigate("/login"), 2000); 
        } catch (error) {
            const errorMessage = error.response?.data || "Registration failed. Please try again.";
            setNotification({ message: errorMessage, type: "error" });
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h1>Register</h1>
            <Notification message={notification.message} type={notification.type} />
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ display: "block", width: "100%", padding: "0.5rem" }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ display: "block", width: "100%", padding: "0.5rem" }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label>
                        Phone:
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            style={{ display: "block", width: "100%", padding: "0.5rem" }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            style={{ display: "block", width: "100%", padding: "0.5rem" }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{ display: "block", width: "100%", padding: "0.5rem" }}
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    style={{
                        display: "block",
                        width: "100%",
                        padding: "0.75rem",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Register
                </button>
            </form>
            <p style={{ marginTop: "1rem" }}>
                Already have an account?
                <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>Login here</Link>
                </p>
        </div>
    );
};

export default RegisterPage;
