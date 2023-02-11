const express = require('express')
const mongoose = require('mongoose')

const restaurantRouter = require('./routes/restaurants.js')
const userRouter = require('./routes/users.js')
const app = express()
const SERVER_PORT = 3000;

app.use(express.json()) // Make sure it comes back as json
app.use(express.urlencoded());

const DB_CONNECTION_STRING = "mongodb+srv://Ivy:SpyFamily0725*@cluster0.4qege3x.mongodb.net/gbc_full_Stack2?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.route('/').get((req, res) => {
    res.send('<h1>COMP3133 - Lab 03 MongoDB & Mongoose</h1><h1>COMP3133 - Lab 04 Mongoose Validation</h1>');
})

app.use(restaurantRouter)
app.use('/users', userRouter)
app.listen(SERVER_PORT, () => { console.log(`Server running at http://localhost:${SERVER_PORT}/`) })