const mongoose =require('mongoose')
const carritosDB = require('../../database/carritoDB.json') 


const productoSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true},
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
})

const ProductosDAO = mongoose.model('productos', productoSchema)

const carritoSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    productos: [{
        timestamp: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        code: { type: String, required: true},
        thumbnail: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
    }],
    
})

const CarritosDAO = mongoose.model('carritos', carritoSchema)

const MongoConnection = async () =>{
    try {
        const URL = 'mongodb+srv://ecommerce:ecommerce88@cluster0.jgoashy.mongodb.net/ecommerce?retryWrites=true&w=majority'
        await mongoose.connect(URL, {
            serverSelectionTimeoutMS: 5000,
        })
        console.log('Base de datos MongoDB conectada')

        try {
            /* ------------------------------------------------------------------- */
            /*   Escritura de la base de datos: ecommerce, collection: usuarios    */
            /* ------------------------------------------------------------------- */
            //await ProductosDAO.create({"timestamp":"20/11/2022","title":"Calculadora","description":"Calculadora nueva","code":2000110,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png","price":10,"stock":1},{"id":3,"timestamp":"11/09/2022","title":"Globo terraqueo","description":"Globo terraqueo nuevo","code":2000220,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png","price":11,"stock":2})
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

module.exports = {MongoConnection, CarritosDAO, ProductosDAO}
