import { renderHook, act } from "@testing-library/react";
import { useBooks } from "../hooks/useBooks";
import bookService from "../services/bookService";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../services/bookService");

describe("useBooks Hook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should fetch books and update state correctly", async () => {
        const mockBooks = [
            {  title: "React 101", author: "John Doe", price: 29.99 },
            { title: "JavaScript Mastery", author: "Jane Smith", price: 39.99 },
        ];

        bookService.fetchBooksPaginated.mockResolvedValueOnce({
            books: mockBooks,
            totalPages: 2,
            currentPage:1
        });

        const { result } = renderHook(() => useBooks());
console.log(result)
        await act(async () => {});

        expect(result.current.books).toEqual(mockBooks);
        expect(result.current.totalPages).toBe(2);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it("should handle API errors correctly", async () => {
        bookService.fetchBooksPaginated.mockRejectedValueOnce(new Error("Network Error"));

        const { result } = renderHook(() => useBooks());

        await act(async () => {});

        expect(result.current.error).toBe("Network Error");
        expect(result.current.books).toEqual([]);
        expect(result.current.loading).toBe(false);
    });

    it("should update current page correctly", async () => {
        bookService.fetchBooksPaginated.mockResolvedValueOnce({
            data: [{ title: "Book 1", author: "Author 1", price: 19.99 }],
            totalPages: 3,
        });

        const { result } = renderHook(() => useBooks());

        await act(async () => {});

        expect(result.current.currentPage).toBe(1);

        act(() => {
            result.current.setCurrentPage(2);
        });

        expect(result.current.currentPage).toBe(2);
    });
});
