import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div style={{ textAlign: "center" }}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                    ...styles.button,
                    backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
            >
                Previous
            </button>
            <span style={{ fontWeight: "bold" }}> Page {currentPage} of {totalPages} </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                    ...styles.button,
                    backgroundColor: currentPage === totalPages ? "#ccc" : "#007bff",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
            >
                Next
            </button>
        </div>
    );
};

const styles = {
    button: {
        padding: "0.5rem 1rem",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        margin: "0 10px",
    },
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
