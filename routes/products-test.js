const { generateProducts } = require('../controllers/products-testController');

const {Router}= require('express');
const routerProductsTest = new Router();

routerProductsTest.get("/", generateProducts);


module.exports = routerProductsTest;