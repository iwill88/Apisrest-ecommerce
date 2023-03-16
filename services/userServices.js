import { User } from "../models/userSchema.js";
import { loggerError } from "../loggers/loggers.js";
import { UserDAO } from '../daos/index.js';
import bcrypt from "bcrypt";
import { sendRegister } from "../helpers/sendRegister.js"

//let UserDAO = new UserDaoMongoDb()


export default class UserService{
    constructor(){
        this.dao = UserDAO
    }

    async getAllUsers () {
        try {
            return  await this.dao.getAll();
        } catch (err) {
            console.log(err)
        }
           
    }

    async findUserById (id) {
        try {
            console.log("id",id);
            return await this.dao.getById(id);
        } catch (err) {
            console.log(err)
        }
        
    }


    async findUserByEmail (email) {
        try {
            return await this.dao.getByField(email);
        } catch (err){
            console.log(err)
        }
        
    }
 

    async saveUser (newUser)  {

        try {
            await this.dao.save(newUser);
            return newUser;
        } catch (err) {
            console.log(err)
        }
        
    }

    async updateUser (id,body) {

        try {
            let updatedUser = { 
                timestamp: new Date().toISOString(),
                ...body
            };
            await this.dao.updateById(id,updatedUser);
            return await this.dao.getById(id)
        } catch (err) {
            console.log(err)
        }

   }

    async deleteUserById (id){

        try {
            console.log("id",id);
            await this.dao.deleteById(id)
            return
        } catch (err){
            console.log(err)
        }
     
     }
 

     //services for passport

     async register (req, email, password, done) {

        try {

                const usuario = await this.dao.getByField(email); 

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
        
                this.dao.save(user);
        
                sendRegister(user)
          
                return done(null, user);
        } catch (error){
            return done(error);
        }
     
     }

     async login (email, password, done) {

        try {
 
                const user = await  this.dao.getByField(email);
                
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
}

    

     
 



