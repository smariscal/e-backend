const Contenedormongodb = require('../../containers/Contenedormongodb')

class ProductsDAOmongodb extends Contenedormongodb {
  constructor(file) {
    super(file)
  }
}

module.exports = ProductsDAOmongodb