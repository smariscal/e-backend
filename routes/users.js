const express = require('express');
const passport = require('passport');
require('../utils/passport') // importo codigo estrategias passport

const routerUsers = express.Router();


routerUsers.post("/signup", passport.authenticate("signup", {
  failureRedirect: "/failSignUp.html",
}) , (req, res) => {  
  req.session.user = req.user;
  res.redirect("/profile");
});

routerUsers.post("/login", passport.authenticate("login", {
  failureRedirect: "/failLogin.html",
}) ,(req, res) => {
  req.session.user = req.user;
  res.redirect('/profile');
});

module.exports = routerUsers;