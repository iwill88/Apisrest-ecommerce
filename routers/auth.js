import ProductService from "../services/productServices.js";
import CartService  from "../services/cartServices.js";
import { ProductDTO } from "../dtos/ProductDto.js";

const ProductServices = new ProductService()
const CartServices = new CartService()

export const configAuthRouter = (authRouther,upload,passport) => {
    authRouther
  
    // REGISTER
    
    .get("/register", (req, res) => {
        res.render('pages/register');
    })
    
    .post(
        "/register",upload.single("picture"), 
            passport.authenticate("register", {
            failureRedirect: "/failregister",
            successRedirect: "/login",
        })
    )
    
    // FAIL
    
    .get("/failregister", (req, res) => {
        res.render('pages/failregister');
    })
    
    .get("/faillogin", (req, res) => {
        res.render('pages/faillogin');
    })
    
    // BACK
    
    .post("/backRegister", (req,res) => {
        res.redirect('/register')
    })
    
    .post("/backLogin", (req,res) => {
        res.redirect('/login')
    })
    
    // LOGIN
    
    .get('/login', async (req, res) => {
        if (req.isAuthenticated()) {
        res.render('pages/index', {
            usuario: req.user.name, 
        });
    } else {
        res.render('pages/login');
    }
    })


    .post('/login',
        passport.authenticate("login", {
        failureRedirect: "/faillogin",
        successRedirect: "/login",
        })
    )

    .post("/logout", (req, res) => {
        req.session.destroy((err) => {
        if (!err)  res.render('pages/logOut', {usuario:req.user.name});    
        else console.log({ status: "Logout ERROR", body: err });
        })
    })
    
    .get("/profile", (req,res) => {
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

    .get("/products", async (req,res) => {
        if (req.isAuthenticated()) {
        const productos = await ProductServices.getAllProducts();
        const productosFormatted= productos.map((producto)=>new ProductDTO(producto))
        res.render('pages/products', {
            productos:productosFormatted, 
            id_user: req.user._id, 
            });
    } else {
        res.render('pages/login');
    }
    } )

    .get("/cart", async (req,res) => {
        if (req.isAuthenticated()) {
        const productos = await CartServices.getCart(req.user._id);
        res.render('pages/cart', {
            name: req.user.name,
            id_user: req.user._id,
            productos: productos
        });
    } else {
        res.render('pages/login');
    }
    } )
}