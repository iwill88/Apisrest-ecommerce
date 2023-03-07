
import { Router } from "express"

import userController from "../controllers/userController.js"
import roleVerification from "../middlewares/roleVerification.js"

let db 

db=userController

const routerUsers = Router();

routerUsers.get('/',  roleVerification, db.getAll);

routerUsers.get('/:id', roleVerification, db.find);

routerUsers.get('/email', roleVerification, db.findByEmail);

routerUsers.post ('/', roleVerification, db.post);

routerUsers.delete('/:id', roleVerification, db.deleteUser);

routerUsers.put('/:id', roleVerification, db.updateUser);

export default routerUsers;