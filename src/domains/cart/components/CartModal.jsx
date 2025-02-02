import React from "react";
import Modal from "../../../components/common/Modal/Modal";

const CartModal = ({ isOpen, onClose, cartItems, onCheckout }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Cart Summary">
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.title}>
                                {item.title} - ${item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <button onClick={onCheckout} style={styles.checkoutButton}>
                        Checkout
                    </button>
                </>
            )}
        </Modal>
    );
};

const styles = {
    checkoutButton: {
        marginTop: "1rem",
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "0.5rem",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default CartModal;
