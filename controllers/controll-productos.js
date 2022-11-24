const Database = require("../productosClass");

const db = new Database;


const getAll = async (req,res)=>{
    
    res.json(await db.getAll());
}

const find = async (req,res)=>{
    
    const producto = await db.find(parseInt(req.params.id));
    console.log(producto);
    res.json(producto);
}

const post = async (req,res)=>{
    
    const newProduct = await db.post(req.body)
  
    res.json(newProduct);
}

const deleteProduct = async (req,res)=>{
    
    const producto= await db.delete(req.params.id);
    res.json(producto);
}

const update = async (req,res)=>{
    
    const updatedProduct= await db.update(req.params.id,req.body);
    res.json(updatedProduct);
}




module.exports = {getAll,find, post, deleteProduct, update}