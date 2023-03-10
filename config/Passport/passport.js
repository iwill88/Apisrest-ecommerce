import { Strategy as LocalStrategy } from "passport-local";
import { UserDTO } from "../../dtos/UserDto.js";


const passportConfig = (passport, UserService) => {

  const UserServices = new UserService();

  const strategyOptions = { usernameField: "email" };

  // dos estrategias, register y login
  
  const registerStrategy = new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    UserServices.register
  );
  const loginStrategy = new LocalStrategy(strategyOptions, UserServices.login);

  passport.use(
    "register", registerStrategy
  );
  
  passport.use(
    "login", loginStrategy

  );

  // creo las funciones de serialize/deserialize user

  passport.serializeUser(function (user, done) {
    done(null, user.email);
  });
  
  passport.deserializeUser(async function (email, done) {
    const user = await UserServices.findUserByEmail(email);
    const userFormatted = new UserDTO(user)
    done(null, userFormatted);
  });

}

export {passportConfig}