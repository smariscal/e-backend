class ContenedorMem {
  constructor(){
    this.products = [];
  }

  generateId(){
    let id = this.products.length ? this.products[this.products.length-1].id + 1 : 1;  // ultimo id + 1
    return id;
  }
  
  async save(obj){
    try {
      obj.id = this.generateId();
      this.products.push(obj);
      return Promise.resolve(obj.id);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getAll(){
    try {
      return Promise.resolve(this.products);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = ContenedorMem;