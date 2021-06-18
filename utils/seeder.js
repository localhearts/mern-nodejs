const Product = require('../models/products')
require('dotenv').config()

const connectDatabase  = require('../config/database')

const products = require('../sample/product')
const { connect } = require('mongodb')

connectDatabase()

const seedProducts = async () => {
    try {

        await Product.deleteMany()
        console.log('product deleted successfully')
        await Product.insertMany(products)
        console.log('product created successfully')
        process.exit()
        
    }catch(error){
        console.log(error.message)
        process.exit()
    }
}

seedProducts()