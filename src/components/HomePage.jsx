import React, {useEffect, useState} from "react";
import BookList from "../domains/books/components/BookList";
import Notification from "./common/Notification";
import { useCart } from "../domains/cart/hooks/useCart";
import Cart from "../domains/cart/components/Cart";
import CartModal from "../domains/cart/components/CartModal";

const HomePage = () => {
    const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, checkout, notification, setNotification } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        if (cartItems.length === 0) {
            setIsModalOpen(false);
        }
    }, [cartItems]);
    return (
        <div style={{ display: "flex", gap: "2rem" }}>
            <div style={{ flex: 2 }}>
                <BookList onAddToCart={addToCart} />
            </div>
            <div style={{ flex: 1 }}>
                {notification && (
                    <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
                )}
                <Cart cartItems={cartItems} onUpdateQuantity={updateQuantity} onRemoveFromCart={removeFromCart} onOpenModal={() => setIsModalOpen(true)} onClearCart={clearCart} />
            </div>
            <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} cartItems={cartItems} onCheckout={checkout} />
        </div>
    );
};

export default HomePage;
