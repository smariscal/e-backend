const Contenedorfirebase = require('../../containers/Contenedorfirebase')

class CartsDAOfirebase extends Contenedorfirebase {
    constructor() {
        super('carts')
    }
}

module.exports = CartsDAOfirebase