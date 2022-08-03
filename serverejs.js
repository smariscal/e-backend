const express = require('express');
const routerProducts = require('./routes/products');
const ejs = require('ejs');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './public/ejs/views');

app.get('/', (req, res) => {
  res.render('index')
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/products", routerProducts);


const listen = app.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`)
});

listen.on("Error", (error) => console.error(error));