export class Book {
    constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }
    getFormattedPrice() {
        return `$${this.price.toFixed(2)}`;
    }
}