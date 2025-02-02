import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Notification = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                onClose(); // Call onClose after hiding the notification
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!visible) return null;
    const notificationStyle = {
        padding: "1rem",
        margin: "1rem 0",
        borderRadius: "5px",
        color: type === "error" ? "#721c24" : "#155724",
        backgroundColor: type === "error" ? "#f8d7da" : "#d4edda",
        border: `1px solid ${type === "error" ? "#f5c6cb" : "#c3e6cb"}`,
    };
    return (
        <div  style={notificationStyle}>
            {message}
        </div>
    );
};

Notification.defaultProps = {
    message: "",
};



Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.oneOf(["success", "error"]).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Notification;
