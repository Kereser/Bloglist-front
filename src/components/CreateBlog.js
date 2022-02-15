import React, { useState } from "react";
import blogService from '../services/blogs'

const CreateBlog = ({ blogs, setBlogs, setNotification }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    try {
      const createdBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setTitle('')
      setUrl('')
      setAuthor('')
      setNotification({ message: `Blog ${title} by ${author} has been successfully created.`, state: 'success'})
      setTimeout(() => {
        setNotification({ message: null, state: null })
      }, 5000)
    } catch (exception) {
      console.error(exception)
      setNotification({ message: `Blog ${title} by ${author} could not be created.`, state: 'failed'})
      setTimeout(() => {
        setNotification({ message: null, state: null})
      }, 5000)
    }

  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="Submit">Create</button>
      </form>
    </div>

  )
}

export default CreateBlog