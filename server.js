require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const contributeRoute = require('./routes/contributeRoute');
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URI

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.use('/', contributeRoute);

app.get('/', (req, res) => {
    res.send('Welcome to WZML-X API')
})

app.use(errorMiddleware);

mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(PORT, ()=> {
            console.log(`Node API app is running on port ${PORT}`)
        });
    }).catch((error) => {
    console.log(error)
})