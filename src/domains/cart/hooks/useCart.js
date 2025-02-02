import { useState } from "react";
import CartService from "../services/cartService";

export function useCart() {
    const [cartItems, setCartItems] = useState([]);
    const [notification, setNotification] = useState({ message: "", type: "" });

    const addToCart = (book) => {
        try {
            console.log("bdddook",book);
            console.log("prevCArt",cartItems);
            setCartItems((prevCart) => CartService.addToCart(prevCart, book));
            setNotification({ message: "Item added to cart!", type: "success" });
        } catch (error) {
            setNotification({ message: error.message, type: "error" });
        }
    };

    const removeFromCart = (bookTitle) => {
        try {
            setCartItems((prevCart) => CartService.removeFromCart(prevCart, bookTitle));
            setNotification({ message: "Item removed from cart!", type: "info" });
        } catch (error) {
            setNotification({ message: error.message, type: "error" });
        }
    };

    const updateQuantity = (bookTitle, quantity) => {
        try {
            setCartItems((prevCart) => CartService.updateQuantity(prevCart, bookTitle, quantity));
            setNotification({ message: "Quantity updated!", type: "success" });
        } catch (error) {
            setNotification({ message: error.message, type: "error" });
        }
    };

    const clearCart = () => {
        try {
            setCartItems(CartService.clearCart());
            setNotification({ message: "Cart has been cleared!", type: "info" });
        } catch (error) {
            setNotification({ message: error.message, type: "error" });
        }
    };

    const checkout = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem("loggedUser") || "{}");
            const username = user?.username;

            if (!username) {
                throw new Error("User is not logged in!");
            }

            const response = await CartService.checkoutCart(cartItems, username);
            setNotification({ message: `Order ${response} placed successfully!`, type: "success" });
            clearCart();
        } catch (error) {
            setNotification({ message: error.message, type: "error" });
        }
    };

    return { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, checkout, notification, setNotification };
}