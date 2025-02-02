import React, { useState } from "react";
import Notification from "../../../components/common/Notification";
import { useBooks } from "../hooks/useBooks";
import BookTable from "./BookTable";
import Pagination from "./Pagination";
import PropTypes from "prop-types";

const BookList = ({ onAddToCart }) => {
    const { books, currentPage, totalPages, loading, error, setCurrentPage } = useBooks();
    const [notification, setNotification] = useState(null);
    console.log("from list",books,currentPage,loading,totalPages)

    const handleAddToCart = (book) => {
        onAddToCart(book);
        setNotification({ message: `${book.title} added to cart!`, type: "success" });
    };

    return (
        <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>Book List</h2>
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            {loading ? (
                <p style={{ textAlign: "center" }}>Loading books...</p>
            ) : error ? (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            ) : (
                <>
                    <BookTable books={books} onAddToCart={handleAddToCart} />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
            )}
        </div>
    );
};

BookList.propTypes = {
    onAddToCart: PropTypes.func.isRequired,
};

export default BookList;
