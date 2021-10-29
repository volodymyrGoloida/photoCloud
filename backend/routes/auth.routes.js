/** @format */

const { Router } = require('express')
const { User } = require('../userSchema/user')
const { Photos } = require('../photoSchema/photos')
const bcrypt = require('bcrypt')
const config = require('config')
const router = Router()
const jwt = require('jsonwebtoken')
const saltRounds = 8
const { validatePassword } = require('../utils/validator')
const jwt_decode = require('jwt-decode')

router.post('/register', async (req, res) => {
    try {
        const { email, password, checkedPassword } = req.body
        if (password !== checkedPassword) {
            return res.status(500).json({ message: 'не вірні паролі' })
        }

        let err = validatePassword(password)

        if (validatePassword(password) !== true) {
            return res.status(400).json({ message: err })
        }
        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(500).json({ message: 'користувач є' })
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const user = new User({
            email: email,
            password: hashedPassword,
        })

        await user.save((err) => {
            if (!err) {
                const token = jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    {
                        expiresIn: '1h',
                    }
                )
                return res.json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                    },
                })
            }
        })
    } catch (e) {
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ message: 'користувач не знайдений' })
        }
        const isTruePswrd = bcrypt.compareSync(password, user.password)
        if (!isTruePswrd) {
            return res.status(400).json({ message: 'не правильний пароль' })
        }

        const token = jwt.sign({ id: user.id }, config.get('jwtSecret'), {
            expiresIn: '1h',
        })
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message })
    }
})

module.exports = router
