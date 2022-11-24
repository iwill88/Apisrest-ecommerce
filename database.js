const fs=require('fs');

class Database {
    constructor (id) {
        this.id = id,
        this.database =  JSON.parse(fs.readFileSync('./database/productosDB.json','utf-8' ,(result,err)=>{
            if (err) throw err 
            return result
        }))
    }


    getAll(){
        console.log(this.database)
        return this.database;
    }
    find(id) {
        console.log("id",id);
        return this.database.find((item) => item.id === id);
    }

    post(newProduct) {
        let product = {
            id: this.database.length+1,
            timestamp: Date.now(),
            ...newProduct,
           
        }
        this.database.push(product);
        fs.writeFile('./database/productosDB.json', JSON.stringify(this.database), 'utf-8', (err)=>{if (err) throw err})
        return product;
    }

    delete(id) {
        const index=this.database.findIndex((item) => item.id === parseInt(id));
        const producto=this.database.splice(index,1);
        console.log(producto);
        fs.writeFile('./database/productosDB.json', JSON.stringify(this.database), 'utf-8', (err)=>{if (err) throw err})
        return producto;
    }

    update(id,body) {
        let index = this.database.findIndex((item) => item.id === parseInt(id));
        let updatedProduct = { 
            id:parseInt(id),
            timestamp: Date.now(),
            ...body
        };
        this.database[index] = updatedProduct;
        fs.writeFile('./database/productosDB.json', JSON.stringify(this.database), 'utf-8', (err)=>{if (err) throw err})
        return updatedProduct;

    }
}

module.exports = Database;