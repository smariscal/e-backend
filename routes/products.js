const { Router } = require("express");
const { isAuthenticated } = require('../middlewares/auth');
const {
  getProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById
} = require("../controllers/productscontroller")

const routerProducts = new Router();

routerProducts.get("/", getProducts);

routerProducts.get('/:id', getProductById);

routerProducts.post('/', isAuthenticated, addProduct);

routerProducts.put('/:id', isAuthenticated, updateProductById);

routerProducts.delete('/:id', isAuthenticated, deleteProductById);

module.exports = routerProducts;