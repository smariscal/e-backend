const { Router } = require("express");
const {
  createCart,
  deleteCartById,
  getCartById,
  addProductToCart,
  deleteProductFromCart
} = require("../controllers/cartscontroller")

//const data = new ContenedorMem();

const routerCart = new Router();

routerCart.post('/', createCart);

routerCart.delete('/:id', deleteCartById);

routerCart.get('/:id/productos', getCartById);

routerCart.post('/:id/productos', addProductToCart);

routerCart.delete('/:id/productos/:id_prod', deleteProductFromCart);

module.exports = routerCart;