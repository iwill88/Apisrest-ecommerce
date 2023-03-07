import { User } from "../models/userSchema.js";
import { loggerError } from "../loggers/loggers.js";
import UserDaoMongoDb from "../daos/UserMongoDao.js";
import bcrypt from "bcrypt";
import { sendRegister } from "../helpers/sendRegister.js"

let UserDAO = new UserDaoMongoDb()


    const getAllUsers = async () => {
        try {
            return  await UserDAO.getAll();
        } catch (err) {
            console.log(err)
        }
           
    }

    const findUserById = async (id) => {
        try {
            console.log("id",id);
            return await UserDAO.getById(id);
        } catch (err) {
            console.log(err)
        }
        
    }


    const findUserByEmail = async (email) => {
        try {
            return await UserDAO.getByField(email);
        } catch (err){
            console.log(err)
        }
        
    }
 

    const saveUser = async(newUser) => {

        try {
            await UserDAO.save(newUser);
            return newUser;
        } catch (err) {
            console.log(err)
        }
        
    }

    const updateUser = async(id,body) => {

        try {
            let updatedUser = { 
                timestamp: new Date().toISOString(),
                ...body
            };
            return await UserDAO.updateById(id,updatedUser);
        } catch (err) {
            console.log(err)
        }

   }

    const deleteUserById = async(id) => {

        try {
            console.log("id",id);
            return await UserDAO.deleteById(id);
        } catch (err){
            console.log(err)
        }
     
     }
 

     //services for passport

     const register = async(req, email, password, done) => {

        try {

                const usuario = await UserDAO.getByField(email); 

                if ( usuario) {
                    
                  return done(null, false);
                }
          
                password= bcrypt.hashSync(password, bcrypt.genSaltSync(10,null));
          
                const user = {
                  timestamp:new Date().toISOString(),
                  email,
                  password, 
                  name:req.body.name, 
                  address:req.body.address,
                  age:req.body.age, 
                  phone:req.body.phone, 
                  picture: `uploaded/${req.file.filename}`
                };
        
                UserDAO.save(user);
        
                sendRegister(user)
          
                return done(null, user);
        } catch (error){
            return done(error);
        }
     
     }

     const login = async(email, password, done) => {

        try {
 
                const user = await  UserDAO.getByField(email);
                
                if (!user) {
                  return done(null, false);
                }
            
                if (!bcrypt.compareSync(password,user.password)) {
                  return done(null, false);
                }
                return done(null, user);
        } catch (error){
            return done(error);
        }
     
     }

     
 



 
export  {
    getAllUsers,
    findUserById,
    findUserByEmail,
    saveUser,
    updateUser,
    deleteUserById,
    login,
    register
}