const fs = require("fs");

class Contenedor {
  constructor(nameFile) {
    this.nameFile = nameFile;
  }
  
  async save(obj){
    try{      
      let cont = await fs.promises.readFile(this.nameFile, 'utf-8');
      // Busco ultimo id
      (cont.length === 0) ? cont = [] : cont = JSON.parse(cont);
      let id = cont.length ? cont[cont.length-1].id + 1 : 1;  // ultimo id + 1
      cont.push({...obj, id: id});
      // grabo el objeto en el archivo
      await fs.promises.writeFile(this.nameFile, JSON.stringify(cont));
      // devuelvo id utilizado
      return id;
    }catch(e){
      console.log(e)
    }
  }

   async getById(id){
    try{
      // recupero contenedor
      let cont = await fs.promises.readFile(this.nameFile, 'utf-8');
      return JSON.parse(cont).find(p => p.id === id) 
    }catch(e){
      console.log(e)
    }
   }

   async update(cont){
    try{
      await fs.promises.writeFile(this.nameFile, JSON.stringify(cont)); 
    }
    catch(err){
      console.log("error", err);
    }
  }

   async getAll(){
    try{
      // devuelvo todo lo que tiene el txt
      let cont = await fs.promises.readFile(this.nameFile, 'utf-8');
      cont = JSON.parse(cont);
      return cont;
    }catch(e){
      console.log(e)
    }
   }

   async deleteById(id){
    try{
      // recupero contenedor
      let c = await this.getById(id);
      if (c){
        // recuper contenedor
        let cont = await fs.promises.readFile(this.nameFile, 'utf-8');
        cont = JSON.parse(cont);
        // filtro los contenedores que no tienen ese id y sobreescribo la variable
        this.update(cont.filter(p => p.id !== id));
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
      let cont = [];
      await fs.promises.writeFile(this.nameFile, JSON.stringify(cont));
    }catch(e){
      console.log(e);
    } 
  }
}

module.exports = Contenedor;