const express = require('express');
const routerProducts = require('./routes/products');
const handlebars = require('express-handlebars');

const app = express();
const PORT = 3000;

const hbs = handlebars.create({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/public/hbs/views/layouts",
  partialsDir: __dirname + "/public/hbs/views/partials/",
  helpers: {
    isdefined: function (value) { return ((value != undefined) && (value.length != 0));}
  },
});

app.engine("hbs", hbs.engine);
app.set('views', "./public/hbs/views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req, res) =>{
  res.render("form");
})

app.use("/products", routerProducts);

const listen = app.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`)
});

listen.on("Error", (error) => console.error(error));