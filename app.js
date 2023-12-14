const express = require('express')
const mongoose = require('mongoose')
const { router } = require('./routes/authRoute')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.set('view engine', 'ejs')
app.use(cookieParser())

// Routes
app.use('/', router)

// Connect to mongodb
mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((error) => console.log(error))