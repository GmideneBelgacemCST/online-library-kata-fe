export const BookRepository = {
  async fetchBooks() {
    try {
      const response = await fetch("/api/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },
};