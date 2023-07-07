// const Blog = ({ blog }) => (
//   <div>
//     {blog.title} {blog.author}
//   </div>
// )

// export default Blog

import { useState } from "react"
import "../style/style.css"
import blogs from "../services/blogs"

const Blog = ({ blog, setBlogs }) => {
  const [details, setDetails] = useState(false)

  const toggleDetails = () => {
    setDetails(!details)
  }

  const likeBlog = async (event) => {
    event.preventDefault()

    const updateBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      await blogs.update(blog.id, updateBlog)
      const updatedBlogs = await blogs.getAll()
      setBlogs(updatedBlogs)
    } catch (e) {
      console.error(e)
    }

  }

  return (
    <div className="blog">
      <div className="blog-title">{blog.title}</div>
      {
        details
          ?
          <div>
            {blog.author}<br />
            {blog.url}<br />
            {/* {blog.likes}<button onClick={() => {console.log("you liked this")}}>like</button><br/> */}
            {blog.likes}<button className="like-button" onClick={likeBlog}>like</button><br />
            {blog.user.username}<br />
            <button className="toggle-details" onClick={toggleDetails}>hide</button>
          </div>
          :
          <button className="toggle-details" onClick={toggleDetails}>show</button>
      }
    </div>)
}

export default Blog