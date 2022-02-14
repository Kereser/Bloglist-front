import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
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

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception)
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
          <LoginForm
            username={username}
            handleChangeUsername={({ target }) => setUsername(target.value)}
            password={password}
            handleChangePassword={({ target }) => setPassword(target.value)}
            handleSubmit={handleSubmit}
          />
          :
          <Blogs
            user={user}
            handleLogOut={handleLogOut}
            blogs={blogs}
          />
      }

    </div>
  )
}

export default App
