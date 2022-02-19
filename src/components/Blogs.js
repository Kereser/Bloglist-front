import Blog from './Blog'

const Blogs = ({ blogs, updateBlog }) => {

  const sortedBlogs = blogs.sort((a,b) => {
    return b.likes - a.likes
  })
  return (
    <div>
      {
        sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>)
      }
    </div>
  )
}

export default Blogs