import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CartModal from "../components/CartModal";

describe("CartModal Component", () => {
    it("renders correctly when open", () => {
        render(<CartModal isOpen={true} onClose={vi.fn()} cartItems={[]} onCheckout={vi.fn()} />);
        expect(screen.getByText("Cart Summary")).toBeInTheDocument();
    });

    it("displays cart items", () => {
        const cartItems = [{ id: 1, title: "React 101", price: 29.99, quantity: 1 }];
        render(<CartModal isOpen={true} onClose={vi.fn()} cartItems={cartItems} onCheckout={vi.fn()} />);
        expect(screen.getByText("React 101 - $29.99 x 1")).toBeInTheDocument();
    });

    it("triggers checkout when button is clicked", () => {
        const checkoutMock = vi.fn();
        render(<CartModal isOpen={true} onClose={vi.fn()} cartItems={[{ id: 1, title: "React 101", price: 29.99, quantity: 1 }]} onCheckout={checkoutMock} />);

        fireEvent.click(screen.getByText("Checkout"));
        expect(checkoutMock).toHaveBeenCalled();
    });
});
