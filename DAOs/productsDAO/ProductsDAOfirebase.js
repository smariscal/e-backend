const Contenedorfirebase = require('../../containers/Contenedorfirebase')

class ProductsDAOfirebase extends Contenedorfirebase {
  constructor() {
    super('products')
  }
}

module.exports = ProductsDAOfirebase