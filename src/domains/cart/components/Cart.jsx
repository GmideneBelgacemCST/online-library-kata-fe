import React from "react";
import PropTypes from "prop-types";

const Cart = ({
                  cartItems,
                  onUpdateQuantity,
                  onRemoveFromCart,
                  onOpenModal,
                  onClearCart,
              }) => {
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleQuantityChange = (title, quantity) => {
        if (quantity < 1) {
            onRemoveFromCart(title);
        } else {
            onUpdateQuantity(title, quantity);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p style={styles.emptyCartText}>Your cart is empty.</p>
            ) : (
                <>
                    <table style={styles.table}>
                        <thead>
                        <tr style={styles.tableHeader}>
                            <th style={styles.th}>Title</th>
                            <th style={styles.th}>Quantity</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.title}>
                                <td style={styles.td}>{item.title}</td>
                                <td style={styles.td}>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                item.title,
                                                parseInt(e.target.value, 10)
                                            )
                                        }
                                        style={styles.input}
                                    />
                                </td>
                                <td style={styles.td}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </td>
                                <td style={styles.td}>
                                    <button
                                        onClick={() => onRemoveFromCart(item.title)}
                                        style={styles.removeButton}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <h3 style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</h3>
                    <div style={styles.buttonContainer}>
                        <button onClick={onClearCart} style={styles.clearButton}>
                            Clear Cart
                        </button>
                        <button onClick={onOpenModal} style={styles.checkoutButton}>
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "1rem",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        textAlign: "center",
        color: "#333",
    },
    emptyCartText: {
        textAlign: "center",
        fontSize: "16px",
        color: "#555",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "1rem",
    },
    tableHeader: {
        backgroundColor: "#f4f4f4",
    },
    th: {
        border: "1px solid #ddd",
        padding: "8px",
        textAlign: "left",
    },
    td: {
        border: "1px solid #ddd",
        padding: "8px",
    },
    input: {
        width: "50px",
        padding: "5px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        textAlign: "center",
    },
    totalPrice: {
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        margin: "15px 0",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginTop: "1rem",
    },
    clearButton: {
        padding: "0.5rem 1rem",
        minWidth: "120px",
        backgroundColor: "#ffc107",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    checkoutButton: {
        padding: "0.5rem 1rem",
        minWidth: "120px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    removeButton: {
        padding: "5px 10px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

Cart.propTypes = {
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired, // ✅ Fixed from "name" to "title"
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
    onRemoveFromCart: PropTypes.func.isRequired,
    onOpenModal: PropTypes.func.isRequired,
    onClearCart: PropTypes.func.isRequired,
};

export default Cart;
