const data = require('../DAOs').cartsDAO;

createCart = async (req, res) => {
  try {
    let add = {timestamp: new Date().toLocaleString('es-AR'), products:[]};
    let id = await data.save(add);
    res.status(201).json(`Carrito creado con el id ${id}`);
  } catch (e) {
    console.error(e);
  }
}

deleteCartById = async (req, res) => {  
  try{
    let id = req.params.id;
    let response = await data.deleteById(id);
    if(response !== 0){
      res.json(`Carrito ${response} eliminado`);
    } else{
      res.status(404).json({ error : 'Carrito no encontrado' })
    }    
  } catch (e) {
    console.error(e);
  }
}

getCartById = async (req, res) => {  
  try{
    let id = req.params.id;
    let cart = await data.getById(id);
    if(cart === undefined){
      res.status(404).json({ error : 'carrito no encontrado' })
    }
    res.json(cart.products);
  } 
  catch(err){
    console.log(err);
  }
}

addProductToCart = async (req, res) => {
  try {
    let id = req.params.id;    
    let carts = await data.getAll();
    let index = carts.findIndex((e) => e.id == id); 
    if (index !== -1) {
      if (carts[index].products.find(p => p.id == req.body.id)){
        // To-Do sumar cantidad del mismo item en el carrito
        res.status(200).json(`Carrito ${id} ya tiene el producto ${req.body.name}`);
      } else {        
        carts[index].products.push(req.body);
        await data.update(carts, id);
        res.status(200).json(`Carrito ${id} actualizado con éxito`);
      }
    } else {
      res.status(404).json({ error : 'Carrito no encontrado' })
    }
  } catch (e) {
      console.error(e);
  }  
}

deleteProductFromCart = async (req, res) => {
  try{
    let id = req.params.id;
    let idProd = parseInt(req.params.id_prod);
    let carts = await data.getAll();
    let index = carts.findIndex((e) => e.id == id); 
    if (index !== -1) {
      carts[index].products = carts[index].products.filter(p => p.id != idProd);
      await data.update(carts, id);
      res.json(`Carrito ${id} actualizado con éxito`);
    } else {
      res.status(404).json({ error : 'Carrito no encontrado' })
    }
    
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
    createCart,
    deleteCartById,
    getCartById,
    addProductToCart,
    deleteProductFromCart
}