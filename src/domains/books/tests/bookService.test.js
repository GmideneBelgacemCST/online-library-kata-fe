import { describe, it, expect, vi, beforeEach } from "vitest";
import bookService from "../services/bookService";

vi.mock("../services/bookService");

describe("Book Service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should fetch and return book objects", async () => {
        const mockBooks = [
            {  title: "title1", author: "author1", price: 29.99 },
            {  title: "title2", author: "author2", price: 39.99 },
        ];

        bookService.fetchBooksPaginated.mockResolvedValueOnce(mockBooks);

        const books = await bookService.fetchBooksPaginated();

        expect(books).toHaveLength(2);
        expect(books[0].title).toBe("title1");
        expect(bookService.fetchBooksPaginated).toHaveBeenCalledTimes(1);
    });

    it(" should throw an error if API fails", async () => {
        bookService.fetchBooksPaginated.mockRejectedValueOnce(new Error("Network Error"));

        await expect(bookService.fetchBooksPaginated()).rejects.toThrow("Network Error");
        expect(bookService.fetchBooksPaginated).toHaveBeenCalledTimes(1);
    });

    it("should fetch paginated books correctly", async () => {
        const mockPaginatedResponse = {
            data: [{   title: "title1", author: "author1", price: 29.99 }],
            totalPages: 3,
        };

        bookService.fetchBooksPaginated.mockResolvedValueOnce(mockPaginatedResponse);

        const result = await bookService.fetchBooksPaginated(1);

        expect(result).toEqual(mockPaginatedResponse);
        expect(bookService.fetchBooksPaginated).toHaveBeenCalledWith(1);
        expect(bookService.fetchBooksPaginated).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if paginated API fails", async () => {
        bookService.fetchBooksPaginated.mockRejectedValueOnce(new Error("Pagination Error"));

        await expect(bookService.fetchBooksPaginated(2)).rejects.toThrow("Pagination Error");
        expect(bookService.fetchBooksPaginated).toHaveBeenCalledWith(2);
        expect(bookService.fetchBooksPaginated).toHaveBeenCalledTimes(1);
    });
});
