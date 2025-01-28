import axios from "../../../api/axios";


const fetchBooksPaginated = async (page) => {
    const response = await axios.get(`/library/books?page=${page}`);
    return response.data;
};

const bookService = {
    fetchBooksPaginated,
};
export default bookService;
