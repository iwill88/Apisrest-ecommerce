import mongoose from "mongoose"


export const productoSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true},
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: {type: String, required: true}
})

const Product = mongoose.model('Product', productoSchema)

export {Product}