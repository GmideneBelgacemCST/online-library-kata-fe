import React from "react";
import Notification from "../../../components/common/Notification";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        notification,
        setNotification,
        handleLogin,
        loading,
    } = useLogin();

    return (
        <div className="login-container">
            <h1>Login</h1>
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: "", type: "" })}
            />
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <p>
                First time?{" "}
                <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default LoginPage;
