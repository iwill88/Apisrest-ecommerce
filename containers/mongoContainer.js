import mongoose from "mongoose";
import * as dotenv from "dotenv";

const options = {
  serverSelectionTimeoutMS: 5000,
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
};

dotenv.config();

await mongoose.connect(process.env.MONGO_URL, options);

export default class MongoDbContainer {
    constructor(collectionString, schema) {
        this.model =  mongoose.models[collectionString] || mongoose.model(collectionString, schema);
      }

      async getById(id) {
        try {
          const item = await this.model.findOne({ _id: id });
          return item;
        } catch (error) {
          console.error(error);
        }
      }

      async getByCriteria(criteria) {
        try {
          const item = await this.model.findOne({criteria});
          return item;
        } catch (error) {
          console.error(error);
        }
      }

      async getByIdPopulate(id,firstPath,secondPath) {
        try {
          const item = this.model.findOne({ id }).populate({
            path: firstPath,
            populate: {
              path: secondPath,
            }
            });
          return item;
        } catch (error) {
          console.error(error);
        }
      }
    
      async getAll() {
        try {
          const data = await this.model.find({});
          return data;
        } catch (error) {
          console.error(error);
        }
      }
    
      async save(itemData) {
        try {
          const data = await this.model.create(itemData);
          return data;
        } catch (error) {
          console.error(error);
        }
      }
    
      async updateById(id, itemData) {
        try {
          await this.model.findOneAndUpdate({_id:id},{$set:itemData});
        } catch (error) {
          console.error(error);
        }
      }

      async deleteById(id) {
        try {
          await this.model.deleteOne({ _id: id });
        } catch (error) {
          console.error(error);
        }
      }
      async getByField(criteria) {
        try {
          const data = await this.model.findOne({email:criteria});
         return data;
        } catch (error) {
          console.error(error);
        }
      }


      async deleteAll() {
        try {
          await this.model.deleteMany({});
        } catch (error) {
          console.error(error);
        }
      }

      


}