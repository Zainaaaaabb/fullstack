const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (blog, newBlog) => {
        if (newBlog.likes > blog.likes) {
            return { title: newBlog.title, author: newBlog.author, likes: newBlog.likes }
        }
        return { title: blog.title, author: blog.author, likes: blog.likes }
    }

    return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
    let famousAuth = blogs.reduce((op, blog) => {
        op[blog.author] = op[blog.author] || 0
        op[blog.author] += 1
        return op
    }, {})

    let index, max = 0

    for (const [key, value] of Object.entries(famousAuth)) {
        if (value > max) {
            max = value
            index = key
        }
    }
    return { author: index, blogs: max }
}


const mostLikes = (blogs) => {
    let mostLiked = blogs.reduce((op, { author, likes }) => {
        op[author] = op[author] || 0
        op[author] += likes
        return op
    }, {})

    let index, max = 0

    for (const [key, value] of Object.entries(mostLiked)) {
        if (value > max) {
            max = value
            index = key
        }
    }
    return { author: index, likes: max }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}