import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import { Togglable } from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  //const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [title, setTitle] = useState("")
  // const [author, setAuthor] = useState("")
  // const [url, setUrl] = useState("")
  // const [CreateBlogVisible, setCreateBlogVisible] = useState(false)


  const testSubmit = () => {
    return
  }

  useEffect(() => {
    // blogService.getAll().then(blogs => {
    //   blogs.sort((a, b) => b.likes - a.likes)
    //   setBlogs(blogs)
    // }
    // )
    try {
      if (user) {
        if (user.token) {
          blogService.setToken(user.token)
          blogService.getAll()
            .then(blogs => {
              blogs.sort((a, b) => b.likes - a.likes)
              setBlogs(blogs)
            })
        }
      }
    }

    catch (e) {
      setMessage('User not logged in')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>

        {/* <Notification /> */}
        <LoginForm handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
          username={username}
          password={password}
        />
      </div>
    )
  }

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

  // const addBlog = async (blogObject) => {

  //   try {
  //     newBlogFormRef.current.toggleVisibility()
  //     await blogService.create(blogObject)
  //     const blogs = await blogService.getAll()
  //     blogs.sort((a, b) => b.likes - a.likes)
  //     setBlogs(blogs)

  //     setMessage(`a new blog ${blogObject.title} by ${blogObject.author} created`)
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

  const updateBlog = async (blog) => {

    const updateBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      await blogService.update(blog.id, updateBlog)
      const updatedBlogs = await blogService.getAll()
      updatedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
    }
    catch (e) {
      console.error(e)
      setMessage('Something went wrong, please try again')
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
        <Togglable className='togglable-button' buttonLabel="new blog" ref={newBlogFormRef}>
          <NewBlogForm setMessage={setMessage} setBlogs={setBlogs} setError={setError} blogFormRef={newBlogFormRef} testSubmit={testSubmit} />
        </Togglable>
      </div >
    )
  }

  const renderForm = () => {
    // newBlogFormRef.current.toggleVisibility()
    return (
      <div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            setBlogs={setBlogs}
            user={user}
            setMessage={setMessage}
            setError={setError}
            updateBlog={updateBlog}
          />
        )}
      </div>
    )
  }

  return (
    <div>
      {/* <h1>Blog List</h1> */}
      <h1 id='app-header'>Blogs</h1>
      <div>
        {
          message !== null && <Notification message={message} error={error} />
        }
      </div>
      {/* <Notification message={message} error={error} /> */}

      {!user && loginForm()}
      {user && <div>
        {/* <p>{user.name} logged in</p> */}
        {/* <button onClick={handleLogout}>Log out</button>
         */}
        <h4 className='loggedin-user'>{user.username} logged in</h4>
        <button className='logout-button' onClick={handleLogout}>Log out</button>
        {newBlogForm()}
        {renderForm()}
      </div>
      }
    </div>
  )
}

export default App