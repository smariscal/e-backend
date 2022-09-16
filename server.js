const express = require('express');
const routerProductsTest = require('./routes/products-test');
const handlebars = require('express-handlebars');
const http = require('http');
const app = express();
const server = http.createServer(app);
const Contenedor = require('./contenedor.js');
const { Server } = require('socket.io');
const connectToMongoDB = require('./mongodb');
const { normalizeMsg } = require('./normalizr.js')
const Message = require('./mongodb/schemas/message');
const io = new Server(server);
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

const hbs = handlebars.create({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/hbs/views/layouts",
  partialsDir: __dirname + "/hbs/views/partials",
  helpers: {
    isdefined: function (value) { return ((value != undefined) && (value.length != 0));}
  },
});

app.use(express.static("public"));

app.engine("hbs", hbs.engine);
app.set('views', "./hbs/views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// connect mongoDB
connectToMongoDB()
  .then(() => console.log('conectado correctamente con mongoDB'))
  .catch((err) => console.error('Error al conectar a mongoDB ' + err))
// Socket messages and products
const container2 = new Contenedor(Message);
io.on("connection", async (socket) => {
  // tomo los mensajes hasta el momento
  const mensaje = await container2.getAll();
  io.emit("update-messages", normalizeMsg(mensaje));
  // tomo los productos hasta el momento
  socket.emit("products");
  // posteo mensaje y lo grabo
  socket.on("post-message", async (msg) => {
    await container2.save(msg);
    const mensaje = await container2.getAll();
    io.emit("update-messages", normalizeMsg(mensaje));
  });
});

// routes
app.get('/',(req, res) =>{
  res.render("main");
})
app.use("/api/products-test", routerProductsTest);

// liste server
const listen = server.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`)
});

listen.on("Error", (error) => console.error(error));