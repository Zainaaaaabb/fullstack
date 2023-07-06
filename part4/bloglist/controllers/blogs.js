const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const userExtractor = require('../utils/middleware').userExtractor


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.status(200).json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const user = request.user
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author || '',
        url: request.body.url,
        likes: request.body.likes || 0,
        user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findByIdAndRemove(request.params.id)

    if (!blog) {
        return response.status(204).end()
    }

    if (blog.user.toString() === user.id.toString()) {
        return response.status(204).end()
    }
    else {
        return response.status(403).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: request.body.user
    }

    const editedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
    response.json(editedBlog)
})

module.exports = blogsRouter