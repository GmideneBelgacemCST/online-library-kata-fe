import axios from "../../../api/axios";
const cartService = {
    checkoutCart: async (cartItems, username) => {
        try {
            const payload = {
                username: username,
                items: cartItems.map((item) => ({
                    title: item.title,
                    price:item.price,
                    quantity: item.quantity,
                })),
            };
            const response = await axios.post("/orders", payload);
            return response.data;
        } catch (error) {
            console.error("Failed to checkout cart:", error);
            throw error;
        }
    },
};

export default cartService;
