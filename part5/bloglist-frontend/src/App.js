import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import { Togglable } from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [title, setTitle] = useState("")
  // const [author, setAuthor] = useState("")
  // const [url, setUrl] = useState("")
  const [CreateBlogVisible, setCreateBlogVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  // window.localStorage.removeItem('loggedNoteappUser')
  // window.localStorage.clear()

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogout = async (event) => {
    event.preventDefault()

    try {

      window.localStorage.removeItem('loggedBlogappUser')
      window.localStorage.clear()

      blogService.setToken('')
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setTimeout(() => {
      }, 5000)
    }
  }

  // const handleNewBlog = async (event) => {
  //   event.preventDefault()

  //   const blog = {
  //     title,
  //     author,
  //     url,
  //   }

  //   try {

  //     await blogService.create(blog)
  //     const blogs = await blogService.getAll()
  //     setBlogs(blogs)
  //     setMessage(`a new blog ${title} by ${author} created`)
  //     setAuthor("")
  //     setTitle("")
  //     setUrl("")
  //     setTimeout(() => {
  //       setMessage(null)
  //     }, 5000)
  //   }

  //   catch (exception) {
  //     setMessage('Failed to create blog, please try again')
  //     setError(true)
  //     setTimeout(() => {
  //       setMessage(null)
  //       setError(false)
  //     }, 5000)
  //   }
  // }

  const addBlog = async (blogObject) => {

    // blogObject.preventDefault()

    try {
      newBlogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      const blogs = await blogService.getAll()
      setBlogs(blogs)

      setMessage(`a new blog ${blogObject.title} by ${blogObject.author} created`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

    catch (exception) {
      setMessage('Failed to create blog, please try again')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const newBlogFormRef = useRef()

  const newBlogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="new note" ref={newBlogFormRef}>
          <NewBlogForm
            // title={title}
            // author={author}
            // url={url}
            // setTitle={setTitle}
            // setAuthor={setAuthor}
            // setUrl={setUrl}
            handleNewBlog={addBlog}
          />
        </Togglable>
      </div>
    )
  }

  const renderForm = () => {
    // newBlogFormRef.current.toggleVisibility()
    return (
      <div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>Blog List</h1>
      <div>
        {
          message !== null && <Notification message={message} error={error} />
        }
      </div>
      {/* <Notification message={message} error={error} /> */}

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Log out</button>
        {newBlogForm()}
        {renderForm()}
      </div>
      }
    </div>
  )
}

export default App