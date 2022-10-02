const express = require('express');
const routerProductsTest = require('./routes/products-test');
const routerUsers = require('./routes/users');
const handlebars = require('express-handlebars');
const http = require('http');
const Contenedor = require('./contenedor.js');
const { Server } = require('socket.io');
const Message = require('./mongodb/schemas/message');
const app = express();
const server = http.createServer(app);
const connectToMongoDB = require('./mongodb');
const io = new Server(server);
const dotenv = require("dotenv");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const { normalizeMsg } = require('./utils/normalizr');
const passport = require('passport');

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

// Sesiones
app.use(session({
  //Base de datos Mongo
  store: MongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@smariscal.zaald0d.mongodb.net/ecommerce?retryWrites=true&w=majority`,
      mongoOptions: mongoOptions,
      ttl: 60,
      retries: 0
  }),
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));

// Inicializo passport
app.use(passport.initialize());
app.use(passport.session());

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
  try {
    if (req.session.user) {
      res.render('main');
    } else {
      res.render('login');
    }
  } catch (err) {
    console.log(err);
  }
})

app.get('/login', (req, res) => {
  if (req.session.user) {
    const user = req.session.user.username;
    res.send({ user })
  } else {
    res.send({ userName: 'No existe' })
  }
});

app.get('/logout', (req, res) => {
  const username = req.session.user.username;
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.render('logout', {username:username});
    }
  });
});

app.get('/register', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.render('register');
    }
  });
});

app.get("/failLogin", (req, res) => {
  res.render('failLogin');
});

app.get("/failSignUp", (req, res) => {
  res.render('failSignUp');
});

// uses
app.use("/api/products-test", routerProductsTest);
app.use("/api/users", routerUsers);

// liste server
const listen = server.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`)
});

listen.on("Error", (error) => console.error(error));
