import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../services/usersService";

export function useRegister() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
    });

    const [notification, setNotification] = useState({ message: "", type: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotification({ message: "", type: "" });

        setLoading(true);
        try {
            await registerUser(formData);
            setNotification({ message: "Registration successful!", type: "success" });
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            const errorMessage = error.response?.data || "Registration failed. Please try again.";
            setNotification({ message: errorMessage, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        notification,
        loading,
        handleChange,
        handleSubmit,
    };
}
