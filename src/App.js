import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    async function fetchedData() {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (exception) {
        console.error(exception)
      }
    }
    fetchedData()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      setUser(user)
      window.localStorage.setItem('loggedUser', user.token)

    } catch (exception) {
      console.error(exception)
    }
  }

  return (
    <div>
      {
        user === null
          ?
          <div>
            <h2>Log in to application</h2>
            <LoginForm
              username={username}
              handleChangeUsername={({ target }) => setUsername(target.value)}
              password={password}
              handleChangePassword={({ target }) => setPassword(target.value)}
              handleSubmit={handleSubmit}
            />
          </div>
          :
          <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
      }

    </div>
  )
}

export default App
