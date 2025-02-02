import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h3>{title}</h3>
                    <button style={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div style={styles.body}>{children}</div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "8px",
        width: "400px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        paddingBottom: "0.5rem",
    },
    closeButton: {
        background: "none",
        border: "none",
        fontSize: "1.5rem",
        cursor: "pointer",
    },
    body: {
        marginTop: "1rem",
    },
};

export default Modal;
