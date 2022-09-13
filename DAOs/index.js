const dotenv = require("dotenv");
dotenv.config();

const productsDatabase = process.env.PRODUCTS_DATABASE;
const cartsDatabase = process.env.CARTS_DATABASE;

// Data Access Objects import
const CartsDAOmemory = require('./cartsDAO/CartsDAOmemory')
const CartsDAOfile = require('./cartsDAO/CartsDAOfile')
const CartsDAOmongoDB = require('./cartsDAO/CartsDAOmongodb')
const CartsDAOfirebase = require('./cartsDAO/CartsDAOfirebase')

const ProductsDAOmemory = require('./productsDAO/ProductsDAOmemory')
const ProductsDAOfile = require('./productsDAO/ProductsDAOfile')
const ProductsDAOmongoDB = require('./productsDAO/ProductsDAOmongodb')
const ProductsDAOfirebase = require('./productsDAO/ProductsDAOfirebase')

// Exporting carts DAO instance based on .env config
let cartsDAO;
switch (cartsDatabase) {
    case 'memory' :
        cartsDAO = new CartsDAOmemory();
        console.log('Conectado exitosamente a la base de datos memory de carritos.');
        break
    case 'file' :
        cartsDAO = new CartsDAOfile('./dbs/files/carts.txt');
        console.log('Conectado exitosamente a la base de datos file de carritos.');
        break
    case 'mongoDB' :
        const Cart = require('../dbs/mongodb/schemas/cart')
        cartsDAO = new CartsDAOmongoDB(Cart);
        const connectToMongoDB = require('../dbs/mongodb');
        connectToMongoDB()
            .then(() => console.log('Conectado exitosamente a la base de datos mongoDB de carritos.'))
            .catch((err) => console.log(`No se pudo conectar a la base de datos mongoDB de carritos. Error: ${err}`));
        break
    case 'firebase' :
        cartsDAO = new CartsDAOfirebase();
        console.log('Conectado exitosamente a la base de datos firebase de carritos.');
        break
}

let productsDAO;
switch (productsDatabase) {
    case 'memory' :
         productsDAO = new ProductsDAOmemory();
         console.log('Conectado exitosamente a la base de datos memory de productos.');
        break
    case 'file' :
        productsDAO= new ProductsDAOfile('./dbs/files/products.txt');
        console.log('Conectado exitosamente a la base de datos file de productos.');
        break
    case 'mongoDB' :
        const Product = require('../dbs/mongodb/schemas/product');
        productsDAO = new ProductsDAOmongoDB(Product);
        const connectToMongoDB = require('../dbs/mongodb');
        connectToMongoDB()
            .then(() => console.log('Conectado exitosamente a la base de datos mongoDB de productos.'))
            .catch((err) => console.log(`No se pudo conectar a la base de datos mongoDB de productos. Error: ${err}`));
        break
    case 'firebase' :
        productsDAO = new ProductsDAOfirebase();
        console.log('Conectado exitosamente a la base de datos firebase de productos.');
        break
}

module.exports = {
    cartsDAO,
    productsDAO
}