import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import ProductService from "./services/productServices.js";

const Product = new ProductService()

const productTypeDef = `
type Product {
    _id: ID,
    timestamp: String!,
    title: String!,
    author: String!,
    description: String!,
    thumbnail: String!,
    price: Int!,
    stock: Int!,
    category: String!
}

input ProductInput {
    title: String!,
    author: String!,
    description: String!,
    thumbnail: String!,
    code: String!,
    price: Int!,
    stock: Int!,
    category: String!
}

input ProductInputUpdate {
    title: String,
    author: String,
    description: String,
    thumbnail: String,
    code: String,
    price: Int,
    stock: Int,
    category: String
}

type Query {
    getProduct(id:ID!):Product,
    getAllProducts(limit:Int):[Product]
}

type Mutation {
    createProduct(data:ProductInput):Product,
    updateProduct(id:ID!,data:ProductInputUpdate):Product,
    deleteProduct(id:ID!):String
}


`
const getProduct = async({id}) => {
    const data = await Product.getProductById(id)
    return data
}

const getAllProducts = async() => {
    const data = await Product.getAllProducts()
    return data
}

const createProduct = async({data}) => {
    const res = await Product.createProduct(data)
    return res
}

const updateProduct = async({id,data}) => {
    const res = await Product.updateProductById(id,data)
    return res
}

const deleteProduct = async({id}) => {
    const res = await Product.deleteProductById(id)
    return "producto eliminado"
}

const schema = buildSchema(productTypeDef)

const app = express()

app.use('/graphql', graphqlHTTP(
    {
        schema,
        rootValue: {
            getProduct,
            getAllProducts,
            createProduct,
            updateProduct,
            deleteProduct
        },
        graphiql: true
    }
))

app.listen(3001, () => console.log("contectados"));