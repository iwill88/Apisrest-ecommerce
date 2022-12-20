const {Productos} = require('../../containers/ContenedorMongo')
const ProductosDAO = new Productos;


const getAll = async (req,res)=>{
    
    res.json(await ProductosDAO.getAll());
}

const find = async (req,res)=>{
    
    const producto = await ProductosDAO.find(req.params.id);
    console.log(producto);
    res.json(producto);
}

const post = async (req,res)=>{
    
    const newProduct = await ProductosDAO.post(req.body)
  
    res.json(newProduct);
}

const deleteProduct = async (req,res)=>{
    
    const producto= await ProductosDAO.delete(req.params.id);
    res.json(producto);
}

const update = async (req,res)=>{
    
    const updatedProduct= await ProductosDAO.update(req.params.id,req.body);
    res.json(updatedProduct);
}




module.exports = {getAll,find, post, deleteProduct, update}