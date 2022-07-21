const express = require('express');
const routerProducts = require('./routes/products');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))

app.get('/',(req, res) =>{
  res.sendFile('./public/index.html');
})

app.use("/api/products", routerProducts);

const listen = app.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`)
});

listen.on("Error", (error) => console.error(error));