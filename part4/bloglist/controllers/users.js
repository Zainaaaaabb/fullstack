const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password.length < 4) {
        return response.status(400).json({
            error: 'password length cannot be less than 3 characters'
        })
    }

    if (body.username.length < 4) {
        return response.status(400).json({
            error: 'username cannot be less than 3 characters'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

module.exports = usersRouter