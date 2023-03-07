import * as OrderService from "../services/orderServices.js";


const findOrderbyId = async (req,res)=>{
    const order = await OrderService.findOrderById(req.params.id);
    res.json(order);
}

const createOrder = async (req,res)=>{
    
    const newOrder= await OrderService.createOrder(req.body.id_user)
    //res.redirect("/login")
    res.json(newOrder);
}



export default {findOrderbyId, createOrder}