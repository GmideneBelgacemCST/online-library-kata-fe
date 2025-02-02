import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div style={{...styles.container }}>
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
            <span style={{ ...styles.text, }}> Page {currentPage} of {totalPages} </span>
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
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "80px",
        width: "fit-content",
        margin: "20px auto",
        padding: "10px",
        borderRadius: "10px",
    },
    button: {
        padding: "10px 15px",
        fontSize: "14px",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        minWidth: "80px",
        textAlign: "center",
    },
    text: {
        fontWeight: "bold",
        fontSize: "16px",
    },
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
