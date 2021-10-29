const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const cors = require('cors')

const app = express()
app.use(express.json({ extended: true }))
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)
app.use('/auth', require('./routes/auth.routes'))
app.use('/photos', require('./routes/photo.routes'))

async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017/photosUserDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => {
            console.log('server start on port ' + PORT)
        })
    } catch (error) {
        console.log('error, volodya check code' + error.message)
        process.exit(1)
    }
}
start()
