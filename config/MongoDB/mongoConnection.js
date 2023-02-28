import mongoose from 'mongoose'
import carritosDB from "../../database/carritoDB.json" assert { type: "json" }
import data from "../../data.json" assert { type: "json" }
import { Product } from '../../models/productSchema.js'


import dotenv from "dotenv"
dotenv.config()

const MongoConnection = async () =>{
    try {
        const URL = process.env.MONGO_URL
        await mongoose.connect(URL, {
            serverSelectionTimeoutMS: 5000,
        })
        console.log('Base de datos MongoDB conectada')

        try {
            /* ------------------------------------------------------------------- */
            /*   Escritura de la base de datos: ecommerce, collection: usuarios    */
            /* ------------------------------------------------------------------- */
           // await Product.create(data)
            //console.log('PRODUCTO agregado!')
    
            //----------------------------------------------------------------------------
            /* listar usuarios representándolos en la consola */
            //----------------------------------------------------------------------------
            //const productos = await ProductosDAO.find({})
            //productos.forEach(producto => {
            //    console.log(producto)
            //})

            // await CarritosDAO.insertMany(carritosDB)
            //console.log('Carritos agregado!')

            //const carritos = await CarritosDAO.find({})
            //carritos.forEach(carrito => {
            //    console.log(carrito)
            //})


        } catch (error) {
            console.log(`Error en operación de base de datos ${error}`)
        } 
    
    } catch (error) {
        console.log(`Error de conexión a la base de datos MongoDB ${error}`)
    }
    
}

export {MongoConnection}
