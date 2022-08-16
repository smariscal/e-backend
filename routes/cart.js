const { Router } = require("express")
const Contenedor = require('../contenedor.js');
const ContenedorMem = require('../contenedorMem.js');

const data = new Contenedor('./Mock/carts.txt');
//const data = new ContenedorMem();

const routerCart = new Router();

routerCart.post('/', async (req, res) => {
  try {
    const add = req.body;
    await data.save(add);
    res.redirect('/')
  } catch (e) {
    console.error(e);
  }
});

routerCart.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try{
    let response = await data.deleteById(id);
    if(response !== 0){
      res.json(`Carrito ${response} eliminado`);
    } else{
      res.json({ error : 'Carrito no encontrado' })
    }
    
  } catch (e) {
    console.error(e);
  }
});

routerCart.get('/:id/productos', async (req, res) =>{
  const id = parseInt(req.params.id);
  try{
    let cart = await data.getById(id);
    if(cart === undefined){
      res.send({ error : 'carrito no encontrado' })
    }
    res.send(cart.products);
  } 
  catch(err){
    console.log(err);
  }
});

routerCart.post('/:id/productos', async (req, res) => {
  try {
    const add = req.body;
    await data.save(add);
    res.redirect('/')
  } catch (e) {
    console.error(e);
  }
});

routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
  const id = parseInt(req.params.id);
  try{
    let response = await data.deleteById(id);
    if(response !== 0){
      res.json(`Carrito ${response} eliminado`);
    } else{
      res.json({ error : 'Carrito no encontrado' })
    }
    
  } catch (e) {
    console.error(e);
  }
});

module.exports = routerCart;