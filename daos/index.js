const CarritoDaoMem = require('./carritos/CarritoDaoMem')
const CarritoDaoArchivo = require('./carritos/CarritoDaoArchivo')
const CarritoDaoMongo = require('./carritos/CarritoDaoMongo')
const CarritoDaoFirebase= require('./carritos/CarritoDaoFirebase')

const ProductoDaoMem = require('./productos/ProductoDaoMem')
const ProductoDaoArchivo = require('./productos/ProductoDaoArchivo')
const ProductoDaoMongo = require('./productos/ProductoDaoMongo')
const ProductoDaoFirebase= require('./productos/ProductoDaoFirebase')

module.exports = {CarritoDaoMem,CarritoDaoArchivo,CarritoDaoMongo,CarritoDaoFirebase,ProductoDaoMem,ProductoDaoArchivo,ProductoDaoMongo,ProductoDaoFirebase}
