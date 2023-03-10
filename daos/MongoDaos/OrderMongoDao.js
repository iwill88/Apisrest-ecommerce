import MongoDbContainer from "../../containers/mongoContainer.js";
import {Schema} from 'mongoose'

class OrderDaoMongoDb extends MongoDbContainer {
    constructor() {
      super("Order", {
        timestamp: { type: String, required: true },
        productos: [
         {
            item: {
                timestamp: { type: String, required: true },
                title: { type: String, required: true },
                author: { type: String, required: true },
                description: { type: String, required: true },
                code: { type: String, required: true},
                thumbnail: { type: String, required: true },
                price: { type: Number, required: true },
                stock: { type: Number, required: true },
                category: {type: String, required: true}
            },
            quantity: {
                type: Number,
                required: true,
            },
            total: {
                type: Number,
                required: true,
                default: 0,
            }
        }
        ],
        subTotal: {
            type: Number,
            required: true,
            },
        totalQty: {
            type: Number,
            required: true,
            },
        orderBy: {
            type: Schema.Types.ObjectId, ref: "User"
        }

      });
    }
  }
  
export default OrderDaoMongoDb;