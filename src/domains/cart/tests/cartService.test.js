import { describe, it, expect, vi, beforeEach } from "vitest";
import CartService from "../services/cartService";
import CartRepository from "../repository/cartRepositry";

vi.mock('../repository/cartRepositry', () => ({
    default: {
        checkoutCartCall: vi.fn(),
    },
}));

describe("Cart Service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it(" successfully checks out", async () => {
        const mockCart = [{  title: "title1",author:"author1", price: 29.99, quantity: 1 }];
        const mockResponse = "Order placed successfully";

        CartRepository.checkoutCartCall.mockResolvedValueOnce(mockResponse);

        const result = await CartService.checkoutCart(mockCart, "user1");

        expect(result).toBe(mockResponse);
        expect(CartRepository.checkoutCartCall).toHaveBeenCalledTimes(1);
        expect(CartRepository.checkoutCartCall).toHaveBeenCalledWith(mockCart, "user1");
    });

    it("throws error when checkout fails", async () => {
        const mockCart = [{  title: "title1",author:"author1", price: 29.99, quantity: 1 }];

        CartRepository.checkoutCartCall.mockImplementationOnce(() => {
            throw new Error("Cart is empty!");
        });

        CartRepository.checkoutCartCall.mockImplementationOnce(() => {
            throw new Error("User is not logged in!");
        });

        await expect(CartService.checkoutCart([], "john_doe")).rejects.toThrow("Cart is empty!");
        await expect(CartService.checkoutCart(mockCart, null)).rejects.toThrow("User is not logged in!");
    });
});