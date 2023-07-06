const Blog = require('../models/blogs')
const User = require('../models/users')


const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    }
]

const newBlog = {
    title: 'OAuth Seminar Blog',
    author: 'Ms. Zara Wajid',
    url: 'https://dummyurl.com',
    likes: 7
}

const blogWithMissingLikes = {
    title: 'OAuth Seminar Blog Missing Likes',
    author: 'Ms. Zara Wajid',
    url: 'https://dummyurl.com',
}

const blogWithMissingTitle = {
    author: 'Ms. Zara Wajid',
    url: 'https://dummyurl.com',
    likes: '1'
}

const blogWithMissingURL = {
    title: 'test title',
    author: 'Ms. Zara Wajid',
    likes: '1'
}

const blogToUpdate = {
    title: 'React patterns Updated',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 10
}


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const userBlogInDb = async (username) => {
    const user = await User.findOne({ username: username })
    const blogs = await Blog.find({ user: user._id })
    return blogs[0]
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    newBlog,
    blogWithMissingLikes,
    blogWithMissingTitle,
    blogWithMissingURL,
    blogToUpdate,
    usersInDb,
    userBlogInDb
}