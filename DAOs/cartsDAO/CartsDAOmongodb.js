const Contenedormongodb = require('../../containers/Contenedormongodb')

class CartsDAOmongodb extends Contenedormongodb {
    constructor(file) {
        super(file)
    }
}

module.exports = CartsDAOmongodb