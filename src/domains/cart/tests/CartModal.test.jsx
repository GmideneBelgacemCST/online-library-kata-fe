import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CartModal from "../components/CartModal";
describe("CartModal Component", () => {
    it("renders correctly when open", () => {
        render(<CartModal isOpen={true} onClose={vi.fn()} cartItems={[]} onCheckout={vi.fn()} />);
        expect(screen.getByText("Cart Summary")).not.toBeNull();
    });

    it(" displays cart items", () => {
        const cartItems = [{  title: "title1",author:"author1", price: 29.99, quantity: 1 }];
        render(<CartModal isOpen={true} onClose={vi.fn()} cartItems={cartItems} onCheckout={vi.fn()} />);
        expect(screen.getByText("title1 - $29.99 x 1")).not.toBeNull();
    });

    it(" triggers checkout when button is clicked", () => {
        const checkoutMock = vi.fn();
        render(<CartModal isOpen={true} onClose={vi.fn()} cartItems={[{title: "title1",author:"author1", price: 29.99, quantity: 1 }]} onCheckout={checkoutMock} />);

        fireEvent.click(screen.getByText("Checkout"));
        expect(checkoutMock).toHaveBeenCalled();
    });
});
