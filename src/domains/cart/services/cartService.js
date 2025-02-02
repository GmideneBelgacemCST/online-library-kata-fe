import {CartItem} from "../entity/CartItem";
import cartRepositry from "../repository/cartRepositry";

const CartService = {
    addToCart(cartItems, book) {
        const existingItem = cartItems.find((item) => item.title === book.title);

        if (existingItem) {
            return cartItems.map((item) =>
                item.title === book.title ? new CartItem(item.title, item.author, item.price, item.quantity + 1) : item
            );
        } else {
            return [...cartItems, new CartItem(book.title, book.author, book.price, 1)];
        }
    },

    removeFromCart(cartItems, bookTitle) {
        return cartItems.filter((item) => item.title !== bookTitle);
    },

    updateQuantity(cartItems, bookTitle, quantity) {
        return cartItems.map((item) =>
            item.title === bookTitle ? new CartItem(item.title, item.author, item.price, quantity) : item
        );
    },

    clearCart() {
        return [];
    },

    async checkoutCart(cartItems, username) {
        if (!username) throw new Error("User is not logged in!");
        if (cartItems.length === 0) throw new Error("Cart is empty!");

        try {
            const response = await cartRepositry.checkoutCartCall(cartItems, username);
            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Checkout failed");
        }
    },
};

export default CartService;
