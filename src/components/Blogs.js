import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Toggleable from './Toggleable'

const Blogs = ({ user, handleLogOut, blogs, setBlogs, setNotification }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogOut}>Logout</button></p>
      <Toggleable>
        <CreateBlog
          blogs={blogs}
          setBlogs={setBlogs}
          setNotification={setNotification}
        />
      </Toggleable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs