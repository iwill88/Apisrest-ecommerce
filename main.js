import express from "express"
import bodyParser from "body-parser"
import path from "path";
import logRequestInfo from "./middlewares/logRequestInfo.js";
import routerProductos from "./routers/productos.js";
import routerCarrito from "./routers/carrito.js";
import routerUsers from "./routers/user.js";
import routerOrders from "./routers/order.js";
import session from "./config/Session/session.js";
import passport from "passport"
import upload from "./helpers/multer.js";
import { passportConfig } from "./config/Passport/passport.js";
import {logger,loggerWarn} from "./loggers/loggers.js";
import cluster from "cluster";
import os from "os";
import * as ProductService from "./services/productServices.js";
import * as CartService  from "./services/cartServices.js";
import * as UserService from "./services/userServices.js";

import dotenv from "dotenv"
dotenv.config()


const app = express();

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next) => {
  logger.info(`ruta ${req.path} metodo ${req.method} implementada`)
  next()
})

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//Session config
app.use(session);

// passportConfig -> passport + strategy

passportConfig(passport, UserService);

app.use(passport.initialize());
app.use(passport.session());

  /* --------------------- AUTH --------------------------- */
  
  // REGISTER
  
  app.get("/register", (req, res) => {
    res.render('pages/register');
  });
  
  app.post(
    "/register",upload.single("picture"), 
        passport.authenticate("register", {
          failureRedirect: "/failregister",
          successRedirect: "/login",
      })
  );
  
  // FAIL
  
  app.get("/failregister", (req, res) => {
    res.render('pages/failregister');
  });
  
  app.get("/faillogin", (req, res) => {
    res.render('pages/faillogin');
  });
  
  // BACK
  
  app.post("/backRegister", (req,res) => {
    res.redirect('/register')
  })
  
  app.post("/backLogin", (req,res) => {
    res.redirect('/login')
  })
  
  // LOGIN
  
  app.get('/login', async (req, res) => {
    if (req.isAuthenticated()) {
      res.render('pages/index', {
        usuario: req.user.name, 
      });
  } else {
    res.render('pages/login');
  }
  });


  app.post('/login',
    passport.authenticate("login", {
      failureRedirect: "/faillogin",
      successRedirect: "/login",
    })
  );

  app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (!err)  res.render('pages/logOut', {usuario:req.user.name});    
      else console.log({ status: "Logout ERROR", body: err });
    });
  });
  
  app.get("/profile", (req,res) => {
    if (req.isAuthenticated()) {


      res.render('pages/profile', {
        usuario: req.user.email,
        name: req.user.name,
        address: req.user.address,
        age: req.user.age,
        phone: req.user.phone,
        picture: req.user.picture,
      });
  } else {
    res.render('pages/login');
  }
  } )

  app.get("/products", async (req,res) => {
    if (req.isAuthenticated()) {
      const productos = await ProductService.getAllProducts();
      res.render('pages/products', {
        productos:productos, 
        id_user: req.user._id, 
        });
  } else {
    res.render('pages/login');
  }
  } )

  app.get("/cart", async (req,res) => {
    if (req.isAuthenticated()) {
      const productos = await CartService.getCart(req.user._id);
      res.render('pages/cart', {
        name: req.user.name,
        id_user: req.user._id,
        productos: productos
      });
  } else {
    res.render('pages/login');
  }
  } )

//Routers

app.use('/api/productos', logRequestInfo, routerProductos);
app.use('/api/carrito', logRequestInfo, routerCarrito);
app.use('/api/user', logRequestInfo, routerUsers);
app.use('/api/orders', logRequestInfo, routerOrders);

const modo = process.env.MODO == "";

app.all('*', (req,res)=>{
  loggerWarn.warn(`ruta ${req.path} metodo ${req.method} no implementada`)
  res.status(404).send( { error :-2, descripcion: `ruta ${req.path}`, método: ` ${req.method} no implementada` });
})

if (modo && cluster.isPrimary){
  const numCPUs = os.cpus().length
    
    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)

    for(let i=0; i<numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
}

else {

  const server = app.listen(PORT, () => {
    console.log(`https://localhost:${PORT}`);
  })

  server.on("error", (error) => console.log(error.message));

}

export {app};