import Blog from './Blog'

const Blogs = ({ user, handleLogOut, blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogOut}>Logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs