import {BookRepository} from "../repository/bookRepository";


const fetchBooksPaginated = async (page) => {
    const booksData = await BookRepository.fetchBooksPaginated(page);
    return {
        books: booksData.data.data,
        totalPages: booksData.data.totalPages,
        currentPage: booksData.data.currentPage
    };
};

const bookService = {
    fetchBooksPaginated,
};
export default bookService;
