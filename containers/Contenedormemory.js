class Contenedormemory {
  constructor(){
    this.data = [];
  }

  generateId(){
    let id = this.data.length ? this.data[this.data.length-1].id + 1 : 1;  // ultimo id + 1
    return id;
  }
  
  async save(obj){
    try {
      obj.id = this.generateId();
      this.data.push(obj);
      return Promise.resolve(obj.id);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getById(id){
    try{      
      // recupero contenedor
      return this.data.find(el => el.id == id);
    }catch(e){
      console.log(e)
    }
   }

  async update(data){
    try{
      this.data = data;
    }
    catch(err){
      console.log("error", err);
    }
  }

  async getAll(){
    try {
      return Promise.resolve(this.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteById(id){ 
    try {
      let element = await this.getById(id);
      if (element){
        // filtro los contenedores que no tienen ese id y sobreescribo la variable
        this.update(this.data.filter(el => el.id != id));
        return id;
      }
      return 0;
    } catch (error) {
      console.log(error.message);
    }   
  }
  
  async deleteAll(){
    try {
      return Promise.resolve(this.data = []);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Contenedormemory;