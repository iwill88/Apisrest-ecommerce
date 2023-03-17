import axios from "axios";

const api = axios.create({baseURL:'https://apisrest-ecommerce-production.up.railway.app'})

const getProducts = async () => {
    try{
        const products = await api.get("/api/productos")
        console.log(products.data)
    } catch (err) {
        console.log(err)
    }
}

const getProductById = async () => {
    try{
        const id = "63f90bc8646913cb5374f909"
        const product = await api.get(`/api/productos/${id}`)
        console.log(product.data)
    } catch (err) {
        console.log(err)
    }
}

const postNewProduct = async () => {
    try{
        const data = {
            "title": "El extranjero - Prueba",
            "author": "Albert Camus",
            "description": "Libro escrito por Albert Camus",
            "code": "11122",
            "thumbnail": "https://firebasestorage.googleapis.com/v0/b/libreria-melquiades-6e32c.appspot.com/o/el-extranjero.jpg?alt=media&token=8174ff04-f0b3-4fb4-88cc-57caa7a42136",
            "price": 50,
            "stock": 3,
            "category": "filosofía"
        }
        const newProduct = await api.post(`/api/productos`, data)
        console.log(newProduct.data)
    } catch (err) {
        console.log(err)
    }
}

const updateProductById = async () => {
    try{
        const data = {
            "title": "El extranjero - Actualizado",
            "author": "Albert Camus",
            "description": "Libro escrito por Albert Camus",
            "code": "11122",
            "thumbnail": "https://firebasestorage.googleapis.com/v0/b/libreria-melquiades-6e32c.appspot.com/o/el-extranjero.jpg?alt=media&token=8174ff04-f0b3-4fb4-88cc-57caa7a42136",
            "price": 50,
            "stock": 3,
            "category": "filosofía"
        }
        const updatedProduct = await api.put("/api/productos/64129382f43e23209f2cf2df", data)
        console.log(updatedProduct.data)
    } catch (err) {
        console.log(err)
    }
}

const deleteProductById = async () => {
    try{
        await api.put("/api/productos/64129382f43e23209f2cf2df")
        console.log("producto eliminado")
    } catch (err) {
        console.log(err)
    }
}




//getProducts()
//getProductById()
//postNewProduct()
//updateProductById()
deleteProductById()