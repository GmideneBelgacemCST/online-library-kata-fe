import React from "react";
const Modal = ({ cartItems, onClose, onCheckout }) => {
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "8px",
                    width: "400px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h2>Order Summary</h2>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.title}>
                            {item.title} x {item.quantity} = $
                            {(item.price * item.quantity).toFixed(2)}
                        </li>
                    ))}
                </ul>
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
                <button onClick={onCheckout}>Confirm Checkout</button>
                <button onClick={onClose} style={{ marginLeft: "1rem" }}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Modal;
