const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../schemas/User');
const {Types} = require('mongoose');

// estrategia login
passport.use("login", new LocalStrategy(async (email, password, done) => {
  const user = req.body;
  let existingUser = await c.checkIfEmailExists(user.email);
  if (!existingUser) {
    const error = new HttpError('Usuario y/o contraseña incorrecta', 403);
    return next(error);
  }
  let isValidPassword = await bcrypt.compare(user.password, existingUser.password);
  if (!isValidPassword) {
    const error = new HttpError('Usuario y/o contraseña incorrecta', 403);
    return next(error);
  }
  let token = jwt.sign(
    { email: existingUser.email },
    process.env.SECRET_KEY,
    { expiresIn: '1h' },
  );
  return done(null, token);
}));

// estrategia registro
passport.use("signup", new LocalStrategy({passReqToCallback: true}, async (req, email, password, done) => {
  const newUser = req.body;
  let existingUser = await c.checkIfEmailExists(newUser.email);
  if (existingUser) {
    const error = new HttpError('Ya existe usuario registrado con ese email.', 422);
    return next(error);
  }
  let hashedPassword = await bcrypt.hash(newUser.password, 12);
  newUser.password = hashedPassword;
  await c.save(newUser);  
  let token = jwt.sign({ email: newUser.email }, process.env.SECRET_KEY, { expiresIn: '1h', });
  return done(null, token);
}));

// serialize // deserialize
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  id = Types.ObjectId(id);
  const user = await User.findById(id);
  done(null, user);
});