const express = require('express');
const routerProducts = require('./routes/products');

const app = express();
const PORT = 8080;

app.set('view engine', 'pug');
app.set('views', './public/pug/views');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render('index')
}); 

app.use("/products", routerProducts);


const listen = app.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`)
});

listen.on("Error", (error) => console.error(error));