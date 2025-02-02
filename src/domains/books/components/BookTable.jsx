import React from "react";
import PropTypes from "prop-types";

const BookTable = ({ books, onAddToCart }) => {
    return (
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem" }}>
            <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Author</th>
                <th style={styles.th}>Price</th>
                <th style={styles.thCenter}>Action</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book) => (
                <tr key={book.title}>
                    <td style={styles.td}>{book.title}</td>
                    <td style={styles.td}>{book.author}</td>
                    <td style={styles.td}>${book.price.toFixed(2)}</td>
                    <td style={styles.tdCenter}>
                        <button onClick={() => onAddToCart(book)} style={styles.button}>
                            Add to Cart
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

const styles = {
    th: { border: "1px solid #ddd", padding: "8px", textAlign: "left" },
    thCenter: { border: "1px solid #ddd", padding: "8px", textAlign: "center" },
    td: { border: "1px solid #ddd", padding: "8px" },
    tdCenter: { border: "1px solid #ddd", padding: "8px", textAlign: "center" },
    button: {
        padding: "0.5rem 1rem",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

BookTable.propTypes = {
    books: PropTypes.array.isRequired,
    onAddToCart: PropTypes.func.isRequired,
};

export default BookTable;
