const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const HttpError = require('../utils/HttpError');

dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token)
      res.redirect('/login');
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { email: decodedToken.email };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};