import { useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
export function useLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setNotification({ message: "", type: "" });
        setLoading(true);

        try {
            await login({ username, password });
            setNotification({ message: "Login successful!", type: "success" });
            navigate("/home");
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Invalid credentials.";
            setNotification({ message: errorMsg, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        notification,
        setNotification,
        handleLogin,
        loading,
    };
}
