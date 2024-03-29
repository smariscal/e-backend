const express = require('express');
const routerProducts = require('./routes/products');
const handlebars = require('express-handlebars');
const http = require('http');
const app = express();
const server = http.createServer(app);
const Contenedor = require('./contenedor.js');
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = 3000;

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

let container = new Contenedor("./Mock/products.txt");
let container2 = new Contenedor("./Mock/messages.txt");

io.on("connection", async (socket) => {
  // tomo los mensajes hasta el momento
  io.emit("update-messages", await container2.getAll());
  // tomo los productos hasta el momento
  socket.emit("products", await container.getAll());
  // posteo mensaje y lo grabo
  socket.on("post-message", async (msg) => {
    const message = {
      ...msg,
      socket_id: socket.id,
      date: new Date().toLocaleString("es-AR"),
    };
    await container2.save(message);
    io.sockets.emit("new-message", message);
  });
});

app.get('/',(req, res) =>{
  res.render("main");
})

app.use("/products", routerProducts);

const listen = server.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`)
});

listen.on("Error", (error) => console.error(error));