const fs=require('fs');

class Carrito {
     constructor (id) {
        
        this.id = id,
        this.database =  JSON.parse(fs.readFileSync('./database/carritoDB.json','utf-8' ,(result,err)=>{
            if (err) throw err 
            return result
        }))
        
    }

    getAll(){
        return  this.database;
    }

    find(id) {
        console.log("id",id);
        return this.database.find((item) => item.id === id).productos;
    }

    post(newCart) {
        let cart = {
            id: this.database.length+1,
            timestamp: Date.now(),
            ...newCart,
            
        }
        this.database.push(cart);
        fs.writeFile('./database/carritoDB.json', JSON.stringify(this.database), 'utf-8', (err)=>{if (err) throw err})
        return cart;
    }

    addProducts(id,newProducts) {
        let indexCart = this.database.findIndex((item) => item.id === parseInt(id))
    
        let cartProducts = this.database[indexCart].productos
        newProducts.forEach(e=>cartProducts.push(e))
        this.database[indexCart].productos=cartProducts
        fs.writeFile('./database/carritoDB.json', JSON.stringify(this.database), 'utf-8', (err)=>{if (err) throw err})
        return cartProducts;
    }

    deleteCart(id) {
        const index=this.database.findIndex((item) => item.id === parseInt(id));
        const carrito=this.database.splice(index,1);
        console.log(carrito);
        fs.writeFile('./database/carritoDB.json', JSON.stringify(this.database), 'utf-8', (err)=>{if (err) throw err})
        return carrito; 
    }

    deleteProduct(idCart,idProduct) {
        let indexCart = this.database.findIndex((item) => item.id === parseInt(idCart))
        let indexProduct = this.database[indexCart].productos.findIndex((item) => item.id === parseInt(idProduct))
        console.log("indice",indexProduct)
        let newProducts = this.database[indexCart].productos.splice(indexProduct,1)
        fs.writeFile('./database/carritoDB.json', JSON.stringify(this.database), 'utf-8', (err)=>{if (err) throw err})
        return newProducts;
    }

}

module.exports = Carrito;