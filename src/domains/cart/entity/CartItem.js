export class CartItem {

    constructor(title,author , price, quantity= 1) {
        this.author = author;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }

    getTotalPrice(){
        return this.price * this.quantity;
    }
}
