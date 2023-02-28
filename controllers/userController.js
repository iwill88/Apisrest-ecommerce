import { UserService } from "../services/userServices.js";

const UserController = new UserService;


const getAll = async (req,res)=>{
    
    res.json(await UserController.getAllUsers());
}

const find = async (req,res)=>{
    
    const user = await UserController.findUserById(req.params.id);
    console.log(user);
    res.json(user);
}

const post = async (req,res)=>{
    
    const newUser = await UserController.saveUser(req.body)
  
    res.json(newUser);
}

const deleteUser = async (req,res)=>{
    
    const user= await UserController.deleteUserById(req.params.id);
    res.json(user);
}

const updateUser = async (req,res)=>{
    
    const updatedUser= await UserController.updateUser(req.params.id,req.body);
    res.json(updatedUser);
}




export default {getAll,find, post, deleteUser, updateUser}