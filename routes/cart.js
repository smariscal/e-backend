const { Router } = require("express")
const Contenedor = require('../contenedor.js');
const ContenedorMem = require('../contenedorMem.js');

const data = new Contenedor('./Mock/carts.txt');
//const data = new ContenedorMem();

const routerCart = new Router();

routerCart.post('/', async (req, res) => {
  try {
    const add = {timestamp: new Date().toLocaleString('es-AR'), products:[]};
    let id = await data.save(add);
    res.status(201).json(`Carrito creado con el id ${id}`);
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
      res.status(404).json({ error : 'Carrito no encontrado' })
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
      res.status(404).json({ error : 'carrito no encontrado' })
    }
    res.json(cart.products);
  } 
  catch(err){
    console.log(err);
  }
});

routerCart.post('/:id/productos', async (req, res) => {
  try {
    const id = parseInt(req.params.id);    
    const carts = await data.getAll();
    let index = carts.findIndex((e) => e.id === id); 
    if (index !== -1) {
      if (carts[index].products.find(p => p.id === req.body.id)){
        // To-Do sumar cantidad del mismo item en el carrito
        res.status(201).json(`Carrito ${id} ya tiene el producto ${req.body.name}`);
      } else {        
        carts[index].products.push(req.body);
        await data.update(carts);
        res.status(201).json(`Carrito ${id} actualizado con éxito`);
      }
    } else {
      res.status(404).json({ error : 'Carrito no encontrado' })
    }
  } catch (e) {
      console.error(e);
  }
});

routerCart.delete('/:id/productos/:id_prod', async (req, res) => {  
  try{
    const id = parseInt(req.params.id);
    const idProd = parseInt(req.params.id_prod);
    const carts = await data.getAll();
    let index = carts.findIndex((e) => e.id === id); 
    if (index !== -1) {
      carts[index].products = carts[index].products.filter(p => p.id !== idProd);
      await data.update(carts);
      res.json(`Carrito ${id} actualizado con éxito`);
    } else {
      res.status(404).json({ error : 'Carrito no encontrado' })
    }
    
  } catch (e) {
    console.error(e);
  }
});

module.exports = routerCart;