import axios from "../../../api/axios";

const checkoutCartCall =async (cartItems, username) => {
    try {
      let items = Array.isArray(cartItems) ? cartItems.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })) : [];

      let payload = {
        username: username,
        items: items,
      };

      if (items.length === 0) {
        console.warn("Cart is empty. Returning a response with an empty items array.");
        return payload;
      }
      const response = await axios.post("/orders", this.payload);
      return response.data;
    } catch (error) {
      console.error("Failed to checkout cart:", error);
      throw error;
    }

};
const CartRepository = {
  checkoutCartCall,
};
export default CartRepository;
