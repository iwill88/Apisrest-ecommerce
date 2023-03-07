/*let PokemonDAO;
let BoxDAO;
import dotenv from "dotenv";
dotenv.config();

switch (process.env.PERS) {
    default:
  case "mongodb":
    const { default: PkmnDaoMongoDb } = await import("./pokemon/PkmnMongo.dao.js");
    const { default: BoxDaoMongoDb } = await import("./box/BoxMongo.dao.js");

    PokemonDAO = new PkmnDaoMongoDb();
    BoxDAO = new BoxDaoMongoDb();
    break;

    
}

export { PokemonDAO, BoxDAO };
*/