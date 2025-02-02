import axios from "../../../api/axios";

export const BookRepository = {
  async fetchBooksPaginated(page) {
    try {
      const response = await axios.get(`/library/books?page=${page}`);
      if (response.status!=200) {
        throw new Error("Failed to fetch books");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },
};
