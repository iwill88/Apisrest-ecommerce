export class ProductDTO {
    constructor({_id,title, author, description, thumbnail, price, stock, category}){
        this.id=_id
        this.title = title,
        this.author = author,
        this.description = description,
        this.thumbnail = thumbnail,
        this.price = price,
        this.stock = stock,
        this.category = category
    }
}