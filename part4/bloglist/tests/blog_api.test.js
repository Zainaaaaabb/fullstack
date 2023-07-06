const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/db_helper')

const api = supertest(app)

const Blog = require('../models/blogs')
const User = require('../models/users')

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', name: 'root', passwordHash })
        await user.save()

        await Blog.deleteMany({})
        let blogObject = new Blog(helper.initialBlogs[0])
        blogObject.user = user.id
        await blogObject.save()
        blogObject = new Blog(helper.initialBlogs[1])
        blogObject.user = user.id
        await blogObject.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username smaller than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'xy',
            name: 'Superuser',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password smaller than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'test-user',
            name: 'Superuser',
            password: 's',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

describe('viewing blogs', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', name: 'root', passwordHash })
        await user.save()
        await Blog.deleteMany({})
        let blogObject = new Blog(helper.initialBlogs[0])
        blogObject.user = user.id
        await blogObject.save()
        blogObject = new Blog(helper.initialBlogs[1])
        blogObject.user = user.id
        await blogObject.save()
    })
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('unique identifier is ID', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('saving blogs', () => {
    let token = null
    let username = null
    beforeAll(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'zarawajid', passwordHash })

        await user.save()

        const response = await api
            .post('/api/login')
            .send({ username: 'zarawajid', password: 'password' })
        token = response.body.token
        username = response.body.username
        console.log(username)
    })

    test('fails with status 401 if unauthenticated', async () => {
        await api
            .post('/api/blogs')
            .send(helper.newBlog)
            .expect(401)
    })

    test('blogs are successfully saved', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(helper.newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('blog deletion failed with 403 if authorization token missing', async () => {
        const blogsToDelete = await helper.userBlogInDb(username)
        await api
            .delete(`/api/blogs/${blogsToDelete.id}`)
            .expect(401)
    })

    test('blog deleted successfully with 204 code', async () => {
        const blogsToDelete = await helper.userBlogInDb(username)
        await api
            .delete(`/api/blogs/${blogsToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
    })
})

afterAll(() => {
    mongoose.connection.close()
})