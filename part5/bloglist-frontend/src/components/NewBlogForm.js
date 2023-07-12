import { useState } from 'react'
// import PropTypes from 'prop-types'
import blogService from '../services/blogs'

// const NewBlogForm = ({ handleNewBlog }) => {
export const NewBlogForm = ({ setMessage, setBlogs, setError, blogFormRef, testSubmit }) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const addBlog = async (event) => {
        event.preventDefault()
        const blog = {
            title: title,
            author: author,
            url: url
        }


        // setTitle('')
        // setAuthor('')
        // setUrl('')

        try {
            await blogService.create(blog)
            blogFormRef.current.toggleVisibility()
            const blogs = await blogService.getAll()
            setBlogs(blogs)
            setMessage(`a new blog ${title} by ${author} created`)
            setAuthor('')
            setTitle('')
            setUrl('')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (exception) {
            setMessage('Failed to create blog, please try again')
            setError(true)
            setTimeout(() => {
                setMessage(null)
                setError(false)
            }, 5000)
        }
    }

    return (
        <div>
            <h3>Create new blog</h3>
            <form onSubmit={addBlog}>
                <div>
                    <input placeholder="Title" type="text" value={title} name="title" onChange={event => setTitle(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Author" type="text" value={author} name="author" onChange={event => setAuthor(event.target.value)} />
                </div>
                <div>
                    <input placeholder="URL" type="text" value={url} name="url" onChange={event => setUrl(event.target.value)} />
                </div>
                <button onClick={testSubmit} type="submit">
                    Create New Blog
                </button>
            </form>
        </div>
    )
}

export default NewBlogForm