const dotenv = require("dotenv");
dotenv.config();

const productsDatabase = process.env.PRODUCTS_DATABASE;
const cartsDatabase = process.env.CARTS_DATABASE;

if (process.env.CARTS_DATABASE === 'mongoDB' ||
    process.env.PRODUCTS_DATABASE === 'mongoDB') {
}

const CartsDAOmemory = require('./cartsDAO/CartsDAOmemory')
const CartsDAOfile = require('./cartsDAO/CartsDAOfile')
const CartsDAOmongoDB = require('./cartsDAO/CartsDAOmongodb')
const CartsDAOfirebase = require('./cartsDAO/CartsDAOfirebase')

// Data Access Objects import for products
const ProductsDAOmemory = require('./productsDAO/productsDAOmemory')
const ProductsDAOfile = require('./productsDAO/productsDAOfile')
const ProductsDAOmongoDB = require('./productsDAO/ProductsDAOmongodb')
const ProductsDAOfirebase = require('./productsDAO/productsDAOfirebase')

// Exporting carts DAO instance based on .env config
let cartsDAO;
switch (cartsDatabase) {
    case 'memory' :
        cartsDAO = new CartsDAOmemory();
        break
    case 'file' :
        cartsDAO = new CartsDAOfile('./dbs/files/carts.txt');
        break
    case 'mongoDB' :
        const Cart = require('../dbs/mongodb/schemas/cart')
        cartsDAO = new CartsDAOmongoDB(Cart);
        const connectToMongoDB = require('../dbs/mongodb');
        connectToMongoDB()
            .then(() => console.log('Conectado exitosamente a la base de datos de carritos.'))
            .catch((err) => console.log(`No se pudo conectar a la base de datos de carritos. Error: ${err}`));
        break
    case 'firebase' :
        cartsDAO = new CartsDAOfirebase();
        break
}

let productsDAO;
switch (productsDatabase) {
    case 'memory' :
         productsDAO = new ProductsDAOmemory();
        break
    case 'file' :
        productsDAO= new ProductsDAOfile('./dbs/files/products.txt');
        break
    case 'mongoDB' :
        const Product = require('../dbs/mongodb/schemas/product');
        productsDAO = new ProductsDAOmongoDB(Product);
        const connectToMongoDB = require('../dbs/mongodb');
        connectToMongoDB()
            .then(() => console.log('Conectado exitosamente a la base de datos de productos.'))
            .catch((err) => console.log(`No se pudo conectar a la base de datos de productos. Error: ${err}`));
        break
    case 'firebase' :
        productsDAO = new ProductsDAOfirebase();
        break
}

module.exports = {
    cartsDAO,
    productsDAO
}