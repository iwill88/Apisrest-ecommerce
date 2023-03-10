import dotenv from "dotenv";
import { DataSessionInstance } from "twilio/lib/rest/wireless/v1/sim/dataSession.js";
dotenv.config();

const PERSISTENCIA = process.env.PERSISTENCIA || "mongo"

export default class DAOFactory {

  constructor (type) {
    this.type = type
    this.CartDAO = null
    this.OrderDAO = null
    this.ProductDAO = null
    this.UserDAO = null
  }

  async getCartDAO(){
    if(this.CartDAO) return this.CartDAO;

    const { default: CartDaoMongoDb} = await import("./MongoDaos/CartMongoDao.js");
    this.CartDAO = new CartDaoMongoDb();
    return this.CartDAO;
  }

  async getOrderDAO(){
    if(this.OrderDAO) return this.OrderDAO;

    const { default: OrderDaoMongoDb} = await import("./MongoDaos/OrderMongoDao.js");
    this.OrderDAO = new OrderDaoMongoDb();
    return this.OrderDAO;
  }

  async getProductDAO(){
    if(this.ProductDAO) return this.ProductDAO;

    const { default: ProductDaoMongoDb} = await import("./MongoDaos/ProductMongoDao.js");
    this.ProductDAO = new ProductDaoMongoDb();
    return this.ProductDAO;
  }

  async getUserDAO(){
    if(this.UserDAO) return this.UserDAO;

    const { default: UserDaoMongoDb} = await import("./MongoDaos/UserMongoDao.js");
    this.UserDAO = new UserDaoMongoDb();
    return this.UserDAO;
  }

  static getInstance() {
    if (!DAOFactory.instance) {
      DAOFactory.instance = new DAOFactory(PERSISTENCIA);
    }
    return DAOFactory.instance;
  }

  async initDAOs() {
    await this.getCartDAO();
    await this.getOrderDAO();
    await this.getProductDAO();
    await this.getUserDAO();
  }

  async getDAOs() {
    await this.initDAOs();
    return  {
      CartDAO:   this.CartDAO,
      OrderDAO:   this.OrderDAO,
      ProductDAO:  this.ProductDAO,
      UserDAO:  this.UserDAO
    }
  }

}



const DAOS = DAOFactory.getInstance()
const DAOS2 =  DAOFactory.getInstance()

console.log("Igual: ", DAOS === DAOS2)

export const {CartDAO, OrderDAO, ProductDAO, UserDAO } = await DAOS.getDAOs()