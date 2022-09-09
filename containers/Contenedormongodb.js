//MongoDB-based data persistence class. Each instance is loaded using a different Schema with mongoose, hence making it reusable
const { Types } = require('mongoose')

class Contenedormongodb {
  constructor(Schema) {
    this.Schema = Schema
  }

  async save(object){
    try {
      let obj = await new this.Schema(object).save()
      return obj.id;
    } catch (err) {
      console.log(err)
    }
  }

  async update(data, id){
    try {
      id = Types.ObjectId(id);
      let item = data.find(el => el.id == id);
      await this.Schema.replaceOne({id: id}, item)      
    } catch (err) {
      console.log(err)
    }
  }

  async getById (id){
    try {
      id = Types.ObjectId(id)      
      let element = await this.Schema.findOne({_id: id});
      if (element)
        return element;
      return undefined;
    } catch (err) {
      console.error(err)
    }
  }

  async getAll(){ 
    try {
      return await this.Schema
        .find();
    } catch (err) {
      console.error(err)
    }
  }

  async deleteById(id){
    try {
      id = Types.ObjectId(id)
      const success = await this.Schema
        .deleteOne({_id: id})
      if (success.deletedCount > 0) {        
        return id;
      }
      return 0; // devuelvo 0 como no encontrado
    } catch (err) {
      console.error(err)
    }
  }

  async deleteAll(){ 
    try {
      this.Schema
        .remove({})
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = Contenedormongodb;