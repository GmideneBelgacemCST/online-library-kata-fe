import React, { useEffect } from "react";
import PropTypes from 'prop-types';

const Notification = ({ message, type, onClose }) => {
    if (!message) return null;

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    const notificationStyle = {
        padding: "1rem",
        margin: "1rem 0",
        borderRadius: "5px",
        color: type === "error" ? "#721c24" : "#155724",
        backgroundColor: type === "error" ? "#f8d7da" : "#d4edda",
        border: `1px solid ${type === "error" ? "#f5c6cb" : "#c3e6cb"}`,
    };

    return <div style={notificationStyle}>{message}</div>;
};

Notification.propTypes = {
    message: PropTypes.string.isRequired, 
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    onClose: PropTypes.func.isRequired,
  };
export default Notification;
