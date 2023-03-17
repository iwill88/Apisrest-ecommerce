import { loggerError } from "../loggers/loggers.js";
import { UserDAO } from '../daos/index.js';
import bcrypt from "bcrypt";
import { sendRegister } from "../helpers/sendRegister.js"

export default class UserService{
    constructor(){
        this.dao = UserDAO
    }

    async getAllUsers () {
        try {
            const users = await this.dao.getAll();
            if(!users){
                loggerError.error(`No se encontraron los usuarios`);
                throw new Error(`No se encontraron los usuarios`);
            }
            return users;
        } catch (err) {
            loggerError.error(`Se produjo un error al intentar buscar a todos los usuarios: ${err}`);
            throw err;
        }
           
    }

    async findUserById (id) {
        try {
            const user = await this.dao.getById(id);
            if(!user){
                loggerError.error(`No se encontro al usuario con ID ${id}`);
                throw new Error(`No se encontro al usuario con ID ${id}`);
            }
            return user
        } catch (err) {
            loggerError.error(`Se produjo un error al intentar buscar al usuario con ID ${id}: ${err}`);
            throw err;
        }
        
    }


    async findUserByEmail (email) {
        try {
            const user = await UserDAO.getByField(email);
            if(!user){
                loggerError.error(`No se encontro al usuario con email ${email}`);
                throw new Error(`No se encontro al usuario con email ${email}`);
            }
            return user
        } catch (err){
            loggerError.error(`Se produjo un error al intentar buscar al usuario con email ${email}: ${err}`);
            throw err;
        }
        
    }
 

    async saveUser (newUser)  {

        try {
            const user = await this.dao.save(newUser);
            if(!user){
                loggerError.error(`No se creo el nuevo usuario`);
                throw new Error(`No se creo el nuevo usuario`);
            }
            return user;
        } catch (err) {
            loggerError.error(`Se produjo un error al intentar crear al nuevo usuario: ${err}`);
            throw err;
        }
        
    }

    async updateUser (id,body) {

        try {
            let updatedUser = { 
                timestamp: new Date().toISOString(),
                ...body
            };
            const result =  await this.dao.updateById(id,updatedUser);
            if(!result){
                loggerError.error(`No se actualizo el usuario con ID ${id}`);
                throw new Error(`No se actualizo el usuario con ID ${id}`);
            }
            return await this.dao.getById(id)
        } catch (err) {
            loggerError.error(`Se produjo un error al intentar actualizar al usuario con ID ${id}: ${err}`);
            throw err;
        }

   }

    async deleteUserById (id){

        try {
            const result = await this.dao.deleteById(id)
            if(!result){
                loggerError.error(`No se elimino el usuario con ID ${id}`);
                throw new Error(`No se elimino el usuario con ID ${id}`);
            }
            return
        } catch (err){
            loggerError.error(`Se produjo un error al intentar eliminar el usuario con ID ${id}: ${err}`);
            throw err;
        }
     
     }
 

     //services for passport

     async register (req, email, password, done) {

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
        

                if (!user.name || !user.email || !user.password) {
                    loggerError.error('Faltan datos obligatorios');
                    throw new Error('Faltan datos obligatorios');
                  }

                this.dao.save(user);
        
                sendRegister(user)
          
                return done(null, user);
        } catch (error){
            loggerError.error(`Se produjo un error al intentar registar al nuevo usuario: ${error}`);
            throw error;
        }
     
     }

     async login (email, password, done) {

        try {

                if (!email || !password) {
                    loggerError.error('Faltan datos obligatorios');
                    throw new Error('Faltan datos obligatorios');
                }
 
                const user = await UserDAO.getByField(email);
                
                if (!user) {
                  return done(null, false);
                }
            
                if (!bcrypt.compareSync(password,user.password)) {
                  return done(null, false);
                }
                return done(null, user);
        } catch (error){
            loggerError.error(`Se produjo un error al intentar loguearse: ${error}`);
            throw error;
        }
     
     }
}

    

     
 



