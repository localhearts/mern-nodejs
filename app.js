const express = require('express')
const app = express()

app.use(express.json())

require('dotenv').config()

const product = require('./routes/products')

app.use('/api/v1/',product);
app.listen(process.env.PORT,()=>{
    console.log(`Server start on PORT: ${process.env.PORT}`)
})
module.exports = app;

