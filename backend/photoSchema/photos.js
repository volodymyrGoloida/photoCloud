const mongoose = require('mongoose')
const { userSchema } = require('../userSchema/user')
const photoSchema = new mongoose.Schema({
    _id: Object,
    photos: [],
})
const Photos = new mongoose.model('photos', photoSchema)

module.exports = { Photos, photoSchema }
