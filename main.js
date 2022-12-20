const express = require("express"); 
const app = express();
const {MongoConnection} = require('./config/MongoDB/mongoConnection.js')
const {FirebaseConnection} = require('./config/Firebase/firebaseConnection.js')
FirebaseConnection();

const PORT = 8080;
const path = require('path');
const logRequestInfo = require("./middlewares/logRequestInfo");
const routerProductos = require("./routers/productos");
const routerCarrito = require("./routers/carrito");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

MongoConnection();

//Router productos

app.use('/api/productos', logRequestInfo, routerProductos);



app.get('/api', logRequestInfo,  (req,res)=> {
    res.sendFile(path.resolve('public/index.html'));
})



//Router carrito

app.use('/api/carrito', logRequestInfo, routerCarrito);


app.get('/api', logRequestInfo,  (req,res)=> {
    res.sendFile(path.resolve('public/index.html'));
})



app.get('*', (req,res)=> {
    res.status(404).send( { error :-2, descripcion: `ruta ${req.path}`, método: ` ${req.method} no implementada` });
})

app.put('*', (req,res)=> {
    res.status(404).send( { error :-2, descripcion: `ruta ${req.path}`, método: ` ${req.method} no implementada` });
})

app.post('*', (req,res)=> {
    res.status(404).send( { error :-2, descripcion: `ruta ${req.path}`, método: ` ${req.method} no implementada` });
})

app.delete('*', (req,res)=> {
    res.status(404).send( { error :-2, descripcion: `ruta ${req.path}`, método: ` ${req.method} no implementada` });
})


const server = app.listen(PORT, () => {
    console.log(`https://localhost:${PORT}`);
})

server.on("error", (error) => console.log(error.message));


module.exports = app;