export class ProductDTO {
    constructor({title, author, description, thumbnail, price, stock, category}){
        this.title = title,
        this.author = author,
        this.description = description,
        this.thumbnail = thumbnail,
        this.price = price,
        this.stock = stock,
        this.category = category
    }
}