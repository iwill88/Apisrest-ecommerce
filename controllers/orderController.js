import { OrderService } from "../services/orderServices.js";

const OrderController = new OrderService;


const findOrderbyId = async (req,res)=>{
    const order = await OrderController.findOrderById(req.params.id);
    res.json(order);
}

const createOrder = async (req,res)=>{
    
    const newOrder= await OrderController.createOrder(req.body.id_user)
    res.redirect("/login")
    //res.json(newOrder);
}



export default {findOrderbyId, createOrder}