const { Router } = require("express")
const Contenedor = require('../contenedor.js');
const { isAuthenticated } = require('../middlewares/auth')
const ContenedorMem = require('../contenedorMem.js');

const data = new Contenedor('./Mock/products.txt');
//const data = new ContenedorMem();

const routerProducts = new Router();

routerProducts.get("/", async (req, res) => {
  try{
    let prods = await data.getAll();
    res.json(prods);
  } 
  catch(err){
    console.log("error", err);
  }
});

routerProducts.get('/:id', async (req, res) =>{
  const id = parseInt(req.params.id);
  try{
    let prod = await data.getById(id);
    if(prod === undefined){
      res.status(404).json({ error : 'producto no encontrado' })
    }
    res.json(prod);
  } 
  catch(err){
    console.log(err);
  }
});

routerProducts.post('/', isAuthenticated, async (req, res) => {
  try {
    const add = req.body;
    let id = await data.save(add);
    res.status(201).json(`Producto creado con el id ${id}`)
  } catch (e) {
    console.error(e);
  }
});

routerProducts.put('/:id', isAuthenticated, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const update = req.body;
    const prods = await data.getAll();
    let index = prods.findIndex((e) => e.id === id); 
    if (index !== -1) {
      if (update.name)
        prods[index].name = update.name;
      if (update.price)
        prods[index].price = update.price;
      if (update.thumbnail)
        prods[index].thumbnail = update.thumbnail;
      if (update.description)
        prods[index].description = update.description;
      if (update.stock)
        prods[index].stock = update.stock;
      if (update.code)
        prods[index].code = update.code;
      await data.update(prods);
      res.json(`Producto ${id} actualizado con éxito`);
    } else {
      res.status(404).json({ error : 'Producto no encontrado' })
    }
  } catch (e) {
    console.error(e);
  }
});

routerProducts.delete('/:id', isAuthenticated, async (req, res) => {
  const id = parseInt(req.params.id);
  try{
    let response = await data.deleteById(id);
    if(response !== 0){
      res.json(`Producto ${response} eliminado`);
    } else{
      res.status(404).json({ error : 'Producto no encontrado' })
    }
    
  } catch (e) {
    console.error(e);
  }
});

module.exports = routerProducts;