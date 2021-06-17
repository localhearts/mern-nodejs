const express = require('express')
const connectDatabase = require('./config/database')
const app = express()

app.use(express.json())

require('dotenv').config()

connectDatabase();
const product = require('./routes/products')

app.use('/api/v1/',product);
app.listen(process.env.PORT,()=>{
    console.log(`Server start on PORT: ${process.env.PORT}`)
})
module.exports = app;

