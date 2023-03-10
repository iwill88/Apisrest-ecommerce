import MongoDbContainer from "../../containers/mongoContainer.js";
import {Schema} from 'mongoose'

class UserDaoMongoDb extends MongoDbContainer {
    constructor() {
      super("User", {
        timestamp: { type: String, required: true },
        email: { type:String, required: true},
        password: { type: String, required: true},
        name: { type: String, required: true},
        address: { type: String, required: true},
        age: { type: Number, required: true},
        phone: { type: String, required: true},
        picture: { type: String, required: true},
        isAdmin: {type: Boolean, required: true, default:false},
        cart: { type: Schema.Types.ObjectId, ref: "Cart" },
        orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
      });
    }
  }
  
export default UserDaoMongoDb;