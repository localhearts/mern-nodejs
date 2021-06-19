const express = require('express')
const connectDatabase = require('./config/database')
const app = express()
const errorMiddleware = require('./middlewares/errors')

app.use(express.json())

require('dotenv').config()

connectDatabase();

const product = require('./routes/products')
const auth = require('./routes/auth')

app.use('/api/v1/',product);
app.use('/api/v1/',auth);

app.listen(process.env.PORT,()=>{
    console.log(`Server start on PORT: ${process.env.PORT}`)
})
app.use(errorMiddleware)

module.exports = app;

