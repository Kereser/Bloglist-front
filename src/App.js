import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notifications'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ message: null, state: null })

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

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ message: 'Wrong username or password', state: 'failed' })
      setTimeout(() => {
        setNotification({ message: null, state: null })
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      {
        user === null
          ?
          <div>
            <Notification notification={notification} />
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
            <Notification notification={notification} />
            <Blogs
              user={user}
              handleLogOut={handleLogOut}
              blogs={blogs}
              setBlogs={setBlogs}
              setNotification={setNotification}
            />
          </div>
      }
    </div>
  )
}

export default App
