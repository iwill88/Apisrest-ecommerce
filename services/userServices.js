import { User } from "../models/userSchema.js";
import { loggerError } from "../loggers/loggers.js";

class UserService {
    constructor  () {
       
        this.database = User
        
    }
 
    getAllUsers(){
        try {
            return  this.database.find({});
        } catch (err) {
            console.log(err)
        }
        
          
         
    }
 
    
    findUserById(_id) {
        try {
            console.log("id",_id);
            return this.database.findById({_id});
        } catch (err) {
            console.log(err)

        }
        
    }

    findUserByEmail(email) {
        try {
            return this.database.findOne({email:email});
        } catch (err){
            console.log(err)
        }
        
    }
 
 
    async saveUser(newUser) {

        try {
            await this.database.create(newUser);
            return newUser;
        } catch (err) {
            console.log(err)
        }
        
    }

    async updateUser(_id,body) {

        try {
            let updatedUser = { 
                timestamp: new Date().toISOString(),
                ...body
            };
            return await this.database.findOneAndUpdate({_id},{$set:updatedUser});
        } catch (err) {
            console.log(err)
        }

        

   }
 
 
     deleteUserById(_id) {

        try {
            console.log("id",_id);
            return this.database.deleteOne({_id});
        } catch (err){
            console.log(err)
        }
     
    }
 
}
 
export {UserService}