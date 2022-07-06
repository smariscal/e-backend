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

      console.log(products);

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
      console.log(product);
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
      console.log(products);
      return products = await fs.promises.readFile(this.nameFile, 'utf-8');
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

const run = () => {
  const cont1 = new Contenedor('./Mock/ProductsMock.txt');
  // const obj1 = {name:'Mesa', precio:500, url:'img/Mesa.jpg'};
  // const obj1 = {name:'Silla', precio:50, url:'img/Silla.jpg'};
  // const obj1 = {name:'Mesada', precio:700, url:'img/Mesada.jpg'};
  // const obj1 = {name:'Ratona', precio:250, url:'img/Ratona.jpg'};
  // const obj1 = {name:'Mesa de luz', precio:250, url:'img/Mesa_de_luz.jpg'};
  // const obj1 = {name:'Rack', precio:350, url:'img/Rack.jpg'};

  // cont1.save(obj1);

  //cont1.getById(3);

  //cont1.getAll();

  //cont1.deleteById(1);

  //cont1.deleteAll();
}

run()