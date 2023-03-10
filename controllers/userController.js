import UserService from "../services/userServices.js";
import { UserDTO } from "../dtos/UserDto.js";
 

const UserServices = new UserService();

const getAll = async (req,res)=>{
    
    const data = await UserServices.getAllUsers();

    res.json(data.map((user) => new UserDTO(user)));
}

const find = async (req,res)=>{
    
    const user = await UserServices.findUserById(req.params.id);
    
    res.json(new UserDTO(user));
}

const findByEmail = async (req,res)=>{
    
    const user = await UserServices.findUserByEmail(req.body.email);
    res.json(new UserDTO(user));
}

const post = async (req,res)=>{
    
    const newUser = await UserServices.saveUser(req.body)
  
    res.json(new UserDTO(newUser));
}

const deleteUser = async (req,res)=>{
    
    const user= await UserServices.deleteUserById(req.params.id);
    res.json(user);
}

const updateUser = async (req,res)=>{
    
    const updatedUser= await UserServices.updateUser(req.params.id,req.body);
    res.json(new UserDTO(updatedUser));
}




export default {getAll,find, post, deleteUser, updateUser, findByEmail}