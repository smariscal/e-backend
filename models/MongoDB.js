const mongoose = require('mongoose');

class MongoDB {
  constructor(model, schema) {
    this.model = mongoose.model(model, schema);
  }

  save = async item => {
    try {
      const newItem = this.model(item);
      let result = await newItem.save();

      return result;
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  getAll = async () => {
    try {
      let data = await this.model.find();

      return data;
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  checkIfEmailExists = async email => {
    try {
      let data = await this.model.findOne({ email: email });

      return data;
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
}

module.exports = MongoDB;