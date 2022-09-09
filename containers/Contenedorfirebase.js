const { db } = require('../dbs/firebase/firebase.js');

class Firebase {
  constructor(col) {
    this.collection = db.collection(col);
  }

  async save(item){
    try {
      const newID = await this.collection.doc().id;
      await this.collection.doc(newID).set({...item, id: newID});
      return newID;
    } catch (err) {
      console.log(err)
    }
  };

  async getAll(){
    try {
      const response = await this.collection.get();
      const docs = response.docs;
      const result = docs.map(doc => doc.data()); 
      return result;
    } catch (err) {
      console.error(err)
    }
  };

  async getById(id){
    try {
      const result = await this.collection.doc(`${id}`).get();
      return result.data();
    } catch (err) {
      console.error(err)
    }
  };

  async update (data, id) {
    try {
      const item = data.find(e => e.id == id);
      await this.collection.doc(`${id}`).update(item);
    } catch (err) {
      console.error(err)
    }
  };

  async deleteById(id){
    try {
      const item = await this.getById(id);
      if(item){
        await this.collection.doc(`${id}`).delete();
        return id;
      } else {
        return 0
      }
    } catch (err) {
      console.error(err)
    }
  }
};

module.exports = Firebase;