import request from "supertest"
import app from "../app.js"
import { expect } from "chai"

describe("test product services", async () => {

    let App = request(app)
    it('should list all products', async() =>{
        const req = await App.get('/api/productos')
        expect(req.statusCode).equal(200);
    })

    it('should get a product by id', async() =>{
        const id = "63f90bc8646913cb5374f909"
        const req = await App.get(`/api/productos/${id}`)
        expect(req.statusCode).equal(200);
    })

    it('should post a new product', async() =>{
        const newProduct = {
            "title": "El extranjero - Prueba Mocha2",
            "author": "Albert Camus",
            "description": "Libro escrito por Albert Camus",
            "code": "11122",
            "thumbnail": "https://firebasestorage.googleapis.com/v0/b/libreria-melquiades-6e32c.appspot.com/o/el-extranjero.jpg?alt=media&token=8174ff04-f0b3-4fb4-88cc-57caa7a42136",
            "price": 50,
            "stock": 3,
            "category": "filosofía"
        }
        const req = await App.post('/api/productos').send(newProduct)
        expect(req.body).to.include.keys("title","author","description","thumbnail","price","stock","category")
        expect(req.statusCode).equal(200);
    })

    it('it should update a product by id', async() => {
        const id = "641399d251d466a07d7d6e21"
        const dataUpdated = {
            "title":"El extranjero - Mocha Updated"
        }
        const req = await App.put(`/api/productos/${id}`).send(dataUpdated)
        expect(req.statusCode).equal(200);
    })

    it('it should delete a product by id', async() => {
        const id = "641399350b9e0e803d96e7d8"
        const req = await App.delete(`/api/productos/${id}`)
        expect(req.statusCode).equal(200);
    })



})


