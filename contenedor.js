const fs = require("fs");

class Contenedor {
  constructor(nameFile) {
    this.nameFile = nameFile;
  }
  
  async save(obj){
    try{      
      let products = await fs.promises.readFile(this.nameFile, 'utf-8');
      // Busco ultimo id
      (products.length === 0) ? products = [] : products = JSON.parse(products);
      let id = products.length ? products[products.length-1].id + 1 : 1;  // ultimo id + 1
      products.push({...obj, id: id});
      // grabo el objeto en el archivo
      await fs.promises.writeFile(this.nameFile, JSON.stringify(products));
      // devuelvo id utilizado
      return id;
    }catch(e){
      console.log(e)
    }
  }

   async getById(id){
    try{
      // recupero productos
      let products = await fs.promises.readFile(this.nameFile, 'utf-8');
      products = JSON.parse(products);
      // devuelvo array con el producto que coincide el id
      let product = products.filter(p => p.id === id);
      return product;
    }catch(e){
      console.log(e)
    }
   }

   async getAll(){
    try{
      // devuelvo todo lo que tiene el txt
      let products = await fs.promises.readFile(this.nameFile, 'utf-8');
      products = JSON.parse(products);
      return products;
    }catch(e){
      console.log(e)
    }
   }

   async deleteById(id){
    try{
      // recuper productos
      let products = await fs.promises.readFile(this.nameFile, 'utf-8');
      products = JSON.parse(products);
      // filtro los productos que no tienen ese id y sobreescribo la variable
      products = products.filter(p => p.id !== id);
      fs.promises.writeFile(this.nameFile, JSON.stringify(products));  // grabo en el txt
    }catch(e){
      console.log(e);
    }
  }

  async deleteAll(){
    try{
      // elimino todos los objetos
      let products = [];
      await fs.promises.writeFile(this.nameFile, JSON.stringify(products));
    }catch(e){
      console.log(e);
    } 
  }
}

module.exports = Contenedor;