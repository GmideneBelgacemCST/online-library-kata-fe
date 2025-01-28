import React, { useEffect, useState } from "react";
import BookList from "../domains/books/components/BookList";
import Cart from "../domains/cart/components/Cart";
import cartService from "../domains/cart/services/cartService";

import Modal from "./common/Modal/Modal";
import Notification from "./common/Notification";

const HomePage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
const [notification, setNotification] = useState(null);
    const handleAddToCart = (book) => {
        const existingItem = cartItems.find((item) => item.title === book.title);
        if (existingItem) {
            const updatedCartItems = cartItems.map((item) =>
                item.title === book.title
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...book, quantity: 1 }]);
        }
    };

    const handleRemoveFromCart = (title) => {
        const updatedCartItems = cartItems.filter((item) => item.title !== title);
        setCartItems(updatedCartItems);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCheckout = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem("loggedUser"));
            const username = user?.username;
    
            if (!username) {
                setNotification({
                    message: "User is not logged in!",
                    type: "error",
                });
                return;
            }
            const response = await cartService.checkoutCart(cartItems, username);
            setNotification({
                message: "Order placed successfully!",
                type: "success",
            });
            setCartItems([]);
            setIsModalOpen(false);
        } catch (error) {
            setNotification({
                message: "Failed to place order. Please try again later.",
                type: "error",
            });
        }
    };
    const handleUpdateQuantity = (booKTitle, quantity) => {
        const updatedCartItems = cartItems.map((item) =>
            item.title === booKTitle ? { ...item, quantity } : item
        );
        setCartItems(updatedCartItems);
    };
    const handleClearCart = () => {
        setCartItems([]);
        setNotification({
            message: "Cart has been cleared!",
            type: "info",
        });
    };
    return (
        <div style={{ display: "flex", gap: "2rem" }}>
            <div style={{ flex: 2 }}>
                <BookList onAddToCart={handleAddToCart} />
            </div>
            <div style={{ flex: 1 }}>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
                <Cart
                    cartItems={cartItems}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveFromCart={handleRemoveFromCart}
                    onOpenModal={handleOpenModal}
                    onClearCart={handleClearCart}
                />
            </div>
            {isModalOpen && (
                <Modal
                cartItems={cartItems}
                onClose={handleCloseModal}
                onCheckout={handleCheckout}
            />
            )}
        </div>
    );
};

export default HomePage;