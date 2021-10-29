const { Router } = require('express')
const jwt_decode = require('jwt-decode')
const { Photos } = require('../photoSchema/photos')
const { User } = require('../userSchema/user')
const routerPhotos = Router()
routerPhotos.get('/', async (req, res) => {
    try {
        //console.log(req.headers['request'])
        let request = JSON.parse(req.headers['request'])
        const token = jwt_decode(request)
        console.log(token)
        if (!token) {
            return res.status(401).json({
                message: 'You are not logged in',
            })
        }
        const user = await User.findById(token.id)
        console.log(user)
        if (!user) {
            return res.status(401).json({
                message: 'You are not logged in',
            })
        }
        const photoUser = await Photos.findById(token.id)
        if (!photoUser) {
            return res.json(user.email)
        }
        return res.json(photoUser.photos)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: e.message,
        })
    }
})
routerPhotos.post('/', async (req, res) => {
    try {
        const { imgUrl, dataLocal } = req.body

        const decodedToken = jwt_decode(dataLocal)
        const { id: userId } = decodedToken

        const candidate = await Photos.findById(userId)

        if (!candidate) {
            const photo = new Photos({
                _id: userId,
                photos: [imgUrl],
            })

            photo.save((err) => {
                if (!err) {
                    console.log('user.register', photo)
                    return res.json(photo.photos)
                }
            })
        } else {
            const doc = await Photos.findOneAndUpdate(
                { _id: userId },
                { $push: { photos: imgUrl } },
                {
                    new: true,
                }
            )
            console.log(doc.photos)
            return res.json(doc.photos)
        }
    } catch (e) {
        console.log(e)
        return res.json(e.message)
    }
}) /
    routerPhotos.delete('/', async (req, res) => {
        try {
            console.log(req.headers['x-auth-token'])
            const dataLocal = req.headers['x-auth-token']
            const imgUrl = req.body.imgUrl
            console.log(imgUrl)
            const decodedToken = await jwt_decode(dataLocal)
            const { id: userId } = decodedToken
            console.log(userId)
            const photoUser = await Photos.findOneAndUpdate(
                { _id: userId },
                { $pull: { photos: imgUrl } },
                { new: true }
            )
            console.log(photoUser)

            return res.json(photoUser.photos)
        } catch (e) {
            res.status(500).json({ message: e })
        }
    })

module.exports = routerPhotos
/*console.log(userId)


       */
