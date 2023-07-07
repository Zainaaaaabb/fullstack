import { useState } from 'react'

const NewBlogForm = ({ handleNewBlog }) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const addBlog = (event) => {
        event.preventDefault()
        handleNewBlog({
            title: title,
            author: author,
            url: url
        })

    
        setTitle('')
        setAuthor('')
        setUrl('')
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
                <button type="submit">Create New Blog</button>
            </form>
        </div>
    )
}

export default NewBlogForm