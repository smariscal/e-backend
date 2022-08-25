const fs = require("fs");
const knex = require('knex');
const knexConfig = require('./knexfile');
const database = knex(knexConfig);

class Contenedor {
  constructor(nameTbl) {
    this.nameTbl = nameTbl;
  }
  
  async save(obj){
    try{      
      return await database(this.nameTbl).insert(obj);
    }catch(e){
      console.log(e)
    }
  }

   async getById(id){
    try{
      return await database(this.nameTbl)
        .select()
        .where(`${this.nameTbl}id`, id);
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
      // devuelvo todo lo que tiene la tabla
      return await database(this.nameTbl)
        .select();
    }catch(e){
      console.log(e)
    }
   }

  async deleteById(id){
    try{
      await database(this.nameTbl)
        .del()
        .where(`${this.nameTbl}id`, id);
    }catch(e){
      console.log(e);
    }
  }
}

module.exports = Contenedor;