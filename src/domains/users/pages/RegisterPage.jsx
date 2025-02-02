import React from "react";
import { Link } from "react-router-dom";
import Notification from "../../../components/common/Notification";
import { useRegister } from "../hooks/useRegister";
import "../styles/RegisterPage.css"; // ✅ Import the CSS file

const fieldTypeMap = {
    name: "text",
    email: "email",
    phone: "tel",
    username: "text",
    password: "password",
};

const RegisterPage = () => {
    const { formData, notification, loading, handleChange, handleSubmit } = useRegister();

    return (
        <div className="register-container">
            <h1>Register</h1>
            <Notification message={notification.message} type={notification.type} />
            <form onSubmit={handleSubmit}>
                {Object.keys(fieldTypeMap).map((field) => (
                    <div key={field} className="form-group">
                        <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                        <input
                            type={fieldTypeMap[field]} // ✅ Fixed field type assignment
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>
                ))}
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            <p>
                Already have an account?{" "}
                <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
