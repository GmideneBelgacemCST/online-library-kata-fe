import { renderHook, act } from "@testing-library/react";
import { useCart } from "../hooks/useCart";
import CartService from "../services/cartService";
import {describe, it, vi,expect,beforeEach} from "vitest";

vi.mock("../services/cartService", () => ({
    default: {
        addToCart: vi.fn((prevCart, book) => [...prevCart, { ...book, quantity: 1 }]),
        removeFromCart: vi.fn((prevCart, bookTitle) => prevCart.filter((item) => item.title !== bookTitle)),
        updateQuantity: vi.fn((prevCart, bookTitle, quantity) =>
            prevCart.map((item) => (item.title === bookTitle ? { ...item, quantity } : item))
        ),
        clearCart: vi.fn(() => []),
        checkoutCart: vi.fn(),
    },
}));

const mockSessionStorage = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => (store[key] = value),
        clear: () => (store = {}),
    };
})();

Object.defineProperty(window, "sessionStorage", { value: mockSessionStorage });

describe("useCart Hook", () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Reset all mocks before each test
        window.sessionStorage.clear(); // Clear sessionStorage before each test
    });

    it("initializes with an empty cart and no notification", () => {
        const { result } = renderHook(() => useCart());
        expect(result.current.cartItems).toEqual([]);
        expect(result.current.notification).toEqual({ message: "", type: "" });
    });

    it("adds an item to the cart", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart({ title: "title-1", author: "author-1", price: 29.99 });
        });

        expect(result.current.cartItems).toHaveLength(1);
        expect(result.current.cartItems[0]).toEqual({
            title: "title-1", author: "author-1", price: 29.99,quantity: 1,
        });
        expect(result.current.notification).toEqual({
            message: "Item added to cart!",
            type: "success",
        });
    });

    it("removes an item from the cart", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart({ title: "title-1", author: "author-1", price: 29.99 });
        });

        act(() => {
            result.current.removeFromCart("title-1");
        });

        expect(result.current.cartItems).toHaveLength(0);
        expect(result.current.notification).toEqual({
            message: "Item removed from cart!",
            type: "info",
        });
    });

    it("updates item quantity", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart({title: "title-1", author: "author-1", price: 29.99});
        });

        act(() => {
            result.current.updateQuantity("title-1", 5);
        });

        expect(result.current.cartItems[0].quantity).toBe(5);
        expect(result.current.notification).toEqual({
            message: "Quantity updated!",
            type: "success",
        });
    });

    it("clears the cart", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart({ title: "title-1", author: "author-1", price: 29.99 });
        });

        act(() => {
            result.current.clearCart();
        });

        expect(result.current.cartItems).toHaveLength(0);
        expect(result.current.notification).toEqual({
            message: "Cart has been cleared!",
            type: "info",
        });
    });

    it("handles checkout success", async () => {
        CartService.checkoutCart.mockResolvedValueOnce("12345");

        // Mock a logged-in user
        window.sessionStorage.setItem("loggedUser", JSON.stringify({ username: "test_user" }));

        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart({ title: "title-1", author: "author-1", price: 29.99 });
        });

        await act(async () => {
            await result.current.checkout();
        });

        expect(result.current.cartItems).toHaveLength(0);
        expect(result.current.notification).toEqual({
            message: "Cart has been cleared!",
            type: "info",
        });
    });

    it("handles checkout failure", async () => {
        CartService.checkoutCart.mockRejectedValueOnce(new Error("Checkout error"));

        window.sessionStorage.setItem("loggedUser", JSON.stringify({ username: "test_user" }));

        const { result } = renderHook(() => useCart());

        await act(async () => {
            await result.current.checkout();
        });

        expect(result.current.notification).toEqual({
            message: "Checkout error",
            type: "error",
        });
    });

    it(" handles checkout failure when user is not logged in", async () => {
        const { result } = renderHook(() => useCart());

        await act(async () => {
            await result.current.checkout();
        });

        expect(result.current.notification).toEqual({
            message: "User is not logged in!",
            type: "error",
        });
    });
});