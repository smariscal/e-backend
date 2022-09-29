const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../utils/HttpError');
const { UsersDAO } = require('../DAOS');

dotenv.config();

let c = new UsersDAO();

const signup = async (req, res, next) => {
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
  res.status(201).json({ email: newUser.email, token: token });
};

const login = async (req, res, next) => {
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
  res.render('main', { email: existingUser.email, token: token });
};

module.exports = {
  signup,
  login,
};