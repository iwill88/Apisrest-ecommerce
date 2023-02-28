import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserService } from "../../services/userServices.js";
import bcrypt from "bcrypt"
import { sendRegister } from "../../helpers/sendRegister.js";

const Users = new UserService()


const passportConfig = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField:"email"
      },
      async (req, email, password, done) => {
  
        const usuario = await Users.findUserByEmail(email); 
        


        if ( usuario) {
            
          return done(null, false);
        }
  
        password= bcrypt.hashSync(password, bcrypt.genSaltSync(10,null));
  
        const user = {
          timestamp:new Date().toISOString(),
          email,
          password, 
          name:req.body.name, 
          address:req.body.address,
          age:req.body.age, 
          phone:req.body.phone, 
          picture: `uploaded/${req.file.filename}`
        };


        Users.saveUser(user);

        sendRegister(email,user)
  
        return done(null, user);
      }
    )
  );
  
  passport.use(
    "login",
    new LocalStrategy( {
      usernameField:"email"
    },async (email, password, done) => {
      const user = await  Users.findUserByEmail(email);
      
      if (!user) {
        return done(null, false);
      }
  
      if (!bcrypt.compareSync(password,user.password)) {
        return done(null, false);
      }
      return done(null, user);
    })
  );
  
  passport.serializeUser(function (user, done) {
    done(null, user.email);
  });
  
  passport.deserializeUser(async function (email, done) {
    const usuario = await Users.findUserByEmail(email);
    done(null, usuario);
  });

}

export {passportConfig}