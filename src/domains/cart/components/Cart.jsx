import React from "react";
import PropTypes from 'prop-types';

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
        <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p style={{ textAlign: "center" }}>Your cart is empty.</p>
            ) : (
                <>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginBottom: "1rem",
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#f4f4f4" }}>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        textAlign: "left",
                                    }}
                                >
                                    Title
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        textAlign: "left",
                                    }}
                                >
                                    Quantity
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        textAlign: "left",
                                    }}
                                >
                                    Price
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        textAlign: "center",
                                    }}
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.title}>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        {item.title}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
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
                                            style={{
                                                width: "50px",
                                                padding: "5px",
                                                border: "1px solid #ddd",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <button
                                            onClick={() =>
                                                onRemoveFromCart(item.title)
                                            }
                                            style={{
                                                padding: "0.5rem 1rem",
                                                backgroundColor: "#dc3545",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3 style={{ textAlign: "center" }}>
                        Total: ${totalPrice.toFixed(2)}
                    </h3>
                    <div style={{ textAlign: "center", marginTop: "1rem" }}>
                        <button
                            onClick={onClearCart}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#ffc107",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginRight: "1rem",
                            }}
                        >
                            Clear Cart
                        </button>
                        <button
                            onClick={onOpenModal}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
Cart.propTypes = {
    cartItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
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
