import { useState } from "react"

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [show, setShow] = useState(false)

  const loggedUser = window.localStorage.getItem('loggedUser')
  const user = JSON.parse(loggedUser)

  const handleElimination = () => {
    if (window.confirm(`Remove blog: ${blog.title} by '${blog.author}'`)){
      removeBlog(blog.id, user.token)
    }
  }

  const eliminationButton = () => {
    if (user.username === blog.user.username) {
      return (
        <button onClick={handleElimination}>Remove blog</button>
      )
    }
    return null
  }

  const handleLikes = async () => {
    const newBlog = {
      likes: blog.likes += 1,
    }

    updateBlog(blog.id, newBlog)
  }

  const styledBlog = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    margin: 4,
  }

  const button = () => {
    return (
      <button onClick={() => setShow(!show)} style={buttonStyle}>
        {show ? 'Hide' : 'Show'}
      </button>
    )
  }

  const blogToShow = show
    ?
    <p style={{ margin: 4}}>
      TITLE: {blog.title}{button()} <br />
      URL: {blog.url} <br />
      LIKES: {blog.likes} <button onClick={handleLikes}>Like</button> <br />
      AUTHOR: {blog.author} <br />
      {eliminationButton()}
    </p>
    :
    <p style={{ margin: 4}}>
      '{blog.title}' by '{blog.author}'
      {button()}
    </p>

  return (
    <div style={styledBlog}>
      {blogToShow}
    </div>
  )
}

export default Blog