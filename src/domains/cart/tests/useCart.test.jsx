import { renderHook, act } from "@testing-library/react";
import { useCart } from "../hooks/useCart";
import CartService from "../services/cartService";
import { vi } from "vitest";

vi.mock("../services/cartService");

describe("useCart Hook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("✅ initializes with an empty cart", () => {
        const { result } = renderHook(() => useCart());
        expect(result.current.cartItems).toEqual([]);
    });

    it("✅ adds an item to the cart", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart({ id: 1, title: "React 101", price: 29.99 });
        });

        act(() => {}); // Ensure React state updates before asserting

        expect(result.current.cartItems).toHaveLength(1);
        expect(result.current.cartItems[0].quantity).toBe(1);
    });

    it("✅ removes an item from the cart", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart({ id: 1, title: "React 101", price: 29.99 });
        });

        act(() => {
            result.current.removeFromCart("React 101");
        });

        act(() => {}); // Ensure state updates

        expect(result.current.cartItems).toHaveLength(0);
    });

    it("✅ updates item quantity", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart({ id: 1, title: "React 101", price: 29.99 });
        });

        act(() => {
            result.current.updateQuantity("React 101", 5);
        });

        act(() => {}); // Ensure state updates

        expect(result.current.cartItems[0].quantity).toBe(5);
    });

    it("✅ clears the cart", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart({ id: 1, title: "React 101", price: 29.99 });
        });

        act(() => {
            result.current.clearCart();
        });

        act(() => {}); // Ensure state updates

        expect(result.current.cartItems).toHaveLength(0);
    });

    it("✅ handles checkout success", async () => {
        CartService.checkoutCart.mockResolvedValueOnce("Order placed");

        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart({ id: 1, title: "React 101", price: 29.99 });
        });

        await act(async () => {
            await result.current.checkout();
        });

        expect(result.current.cartItems).toHaveLength(0);
        expect(result.current.notification.message).toBe("Order placed");
    });

    it("✅ handles checkout failure", async () => {
        CartService.checkoutCart.mockRejectedValueOnce(new Error("Checkout error"));

        const { result } = renderHook(() => useCart());

        await act(async () => {
            await result.current.checkout();
        });

        expect(result.current.notification.message).toBe("Checkout error");
    });
});
