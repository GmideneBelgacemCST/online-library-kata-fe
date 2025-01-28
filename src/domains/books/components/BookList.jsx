import React, { useEffect, useState } from "react";
import Notification from "../../../components/common/Notification";
import bookService from "../services/bookService"
import PropTypes from 'prop-types';

const BookList = ({ onAddToCart }) => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        fetchBooks(currentPage);
    }, [currentPage]);

    const fetchBooks = async (page) => {
        try {
            setLoading(true);
            const response = await bookService.fetchBooksPaginated(page);
            setBooks(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            setNotification({
                message: error.message,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (book) => {
        onAddToCart(book);
        setNotification({
            message: `${book.title} added to cart!`,
            type: "success",
        });
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>Book List</h2>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            {loading ? (
                <p style={{ textAlign: "center" }}>Loading books...</p>
            ) : (
                <div>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginBottom: "1rem",
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#f4f4f4" }}>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        textAlign: "left",
                                    }}
                                >
                                    Title
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        textAlign: "left",
                                    }}
                                >
                                    Author
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        textAlign: "left",
                                    }}
                                >
                                    Price
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        textAlign: "center",
                                    }}
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.title}>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        {book.title}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        {book.author}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                        }}
                                    >
                                        ${book.price.toFixed(2)}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <button
                                            onClick={() => handleAddToCart(book)}
                                            style={{
                                                padding: "0.5rem 1rem",
                                                backgroundColor: "#28a745",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ textAlign: "center" }}>
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor:
                                    currentPage === 1 ? "#ccc" : "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                                marginRight: "1rem",
                            }}
                        >
                            Previous
                        </button>
                        <span style={{ fontWeight: "bold" }}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor:
                                    currentPage === totalPages ? "#ccc" : "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor:
                                    currentPage === totalPages ? "not-allowed" : "pointer",
                                marginLeft: "1rem",
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
BookList.propTypes = {
    books: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
    onAddToCart: PropTypes.func.isRequired,
  };

export default BookList;