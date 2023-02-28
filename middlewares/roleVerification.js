let administrador = true

const roleVerification = (req, res, next) => {
    !administrador ? (res.status(403).send( { error :-1, descripcion: `ruta ${req.path}`, método: ` ${req.method} no autorizada` })):null
    next();
  }
  
export  default roleVerification