const fs = require("fs");

class Contenedorfile {
  constructor(nameFile) {
    this.nameFile = nameFile;
  }
  
  async save(obj){
    try{      
      let data = await fs.promises.readFile(this.nameFile, 'utf-8');
      // Busco ultimo id
      (data.length === 0) ? data = [] : data = JSON.parse(data);
      let id = data.length ? data[data.length-1].id + 1 : 1;  // ultimo id + 1
      data.push({...obj, id: id});
      // grabo el objeto en el archivo
      await fs.promises.writeFile(this.nameFile, JSON.stringify(data));
      // devuelvo id utilizado
      return id;
    }catch(e){
      console.log(e)
    }
  }

   async getById(id){
    try{
      // recupero contenedor
      let data = await fs.promises.readFile(this.nameFile, 'utf-8');
      return JSON.parse(data).find(p => p.id == id) 
    }catch(e){
      console.log(e)
    }
   }

   async update(data){
    try{
      await fs.promises.writeFile(this.nameFile, JSON.stringify(data)); 
    }
    catch(err){
      console.log("error", err);
    }
  }

   async getAll(){
    try{
      // devuelvo todo lo que tiene el txt
      let data = await fs.promises.readFile(this.nameFile, 'utf-8');
      data = JSON.parse(data);
      return data;
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
        let data = await fs.promises.readFile(this.nameFile, 'utf-8');
        data = JSON.parse(data);
        // filtro los contenedores que no tienen ese id y sobreescribo la variable
        this.update(data.filter(p => p.id != id));
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
      let data = [];
      await fs.promises.writeFile(this.nameFile, JSON.stringify(data));
    }catch(e){
      console.log(e);
    } 
  }
}

module.exports = Contenedorfile;