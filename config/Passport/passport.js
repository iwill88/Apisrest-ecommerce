import { Strategy as LocalStrategy } from "passport-local";

const passportConfig = (passport, UserService) => {

  const strategyOptions = { usernameField: "email" };

  // dos estrategias, register y login
  
  const registerStrategy = new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    UserService.register
  );
  const loginStrategy = new LocalStrategy(strategyOptions, UserService.login);

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
    const usuario = await UserService.findUserByEmail(email);
    done(null, usuario);
  });

}

export {passportConfig}