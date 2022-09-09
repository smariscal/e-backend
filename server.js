const express = require('express');
const cors = require('cors');
const routerProducts = require('./routes/products');
const routerCart = require('./routes/cart');

const app = express();

const PORT = 8080;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// permite ser utilizado desde cualquier host
app.use(cors({
  origin: '*'
}));

app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);

// error 404 si no existe la ruta
app.use((req, res) => {
  const response = {
    error: -2,
    descripcion: `${req.url} ${req.method} no implementado`
  };
  res.status(404).json(response);
});


const listen = app.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`)
});

listen.on("Error", (error) => console.error(error));