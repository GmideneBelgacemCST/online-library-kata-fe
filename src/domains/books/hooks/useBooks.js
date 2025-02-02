import { useState, useEffect } from "react";
import bookService from "../services/bookService";

export function useBooks() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks(currentPage);
    }, [currentPage]);

    const fetchBooks = async (page) => {
        try {
            setLoading(true);
            setError(null);
            const response = await bookService.fetchBooksPaginated(page);
            setBooks(response.books);
            setTotalPages(response.totalPages);
            console.log("from hook",books)

        } catch (err) {
            setError(err.message || "Failed to load books");
        } finally {
            setLoading(false);
        }
    };

    return {
        books,
        currentPage,
        totalPages,
        loading,
        error,
        setCurrentPage,
    };
}
