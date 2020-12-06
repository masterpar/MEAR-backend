const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { dbConnection } = require('./database/config')

//Create server express
const app = express()

//DB Mongo
dbConnection()

//CORS
// app.use(cors)

//Folder Public
app.use(express.static('public'))

//Read Body
app.use(express.json())

//Routers
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))



// listen petition
app.listen( process.env.PORT, () => {
    console.log(`server In port ${process.env.PORT}`)
})
