import mongoose, {Schema} from 'mongoose'

const carritoSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    productos: [
        {
            item: {
              type: Schema.Types.ObjectId,
              ref: "Product",
            },
            quantity: {
              type: Number,
              required: true,
            },
            total: {
              type: Number,
              required: true,
              default: 0,
            },
          },
    
    ],
    subTotal: {
        type: Number,
        default: 0,
      },
    totalQty: {
        type: Number,
        default: 1,
      },
    
})

const Cart= mongoose.model('Cart', carritoSchema)

export {Cart}