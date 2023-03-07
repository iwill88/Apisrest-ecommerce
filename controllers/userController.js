import * as UserService from "../services/userServices.js";



const getAll = async (req,res)=>{
    
    res.json(await UserService.getAllUsers());
}

const find = async (req,res)=>{
    
    const user = await UserService.findUserById(req.params.id);
    console.log(user);
    res.json(user);
}

const findByEmail = async (req,res)=>{
    
    const user = await UserService.findUserByEmail(req.body.email);
    console.log(user);
    res.json(user);
}

const post = async (req,res)=>{
    
    const newUser = await UserService.saveUser(req.body)
  
    res.json(newUser);
}

const deleteUser = async (req,res)=>{
    
    const user= await UserService.deleteUserById(req.params.id);
    res.json(user);
}

const updateUser = async (req,res)=>{
    
    const updatedUser= await UserService.updateUser(req.params.id,req.body);
    res.json(updatedUser);
}




export default {getAll,find, post, deleteUser, updateUser, findByEmail}