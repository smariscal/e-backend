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
      return JSON.parse(products).find(p => p.id === id) 
    }catch(e){
      console.log(e)
    }
   }

   async update(products){
    try{
      await fs.promises.writeFile(this.nameFile, JSON.stringify(products)); 
    }
    catch(err){
      console.log("error", err);
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
      // recupero producto
      let prod = await this.getById(id);
      if (prod){
        // recuper productos
        let products = await fs.promises.readFile(this.nameFile, 'utf-8');
        products = JSON.parse(products);
        // filtro los productos que no tienen ese id y sobreescribo la variable
        this.update(products.filter(p => p.id !== id));
        return id;
      }
      return 0; // devuelvo 0 como no encontrado
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