import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Menu = ({ cat }) => {
  const [posts, setPost] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`)
        console.log(res.data)
        setPost(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [cat])

  return (
    <div className='menu'>
      <h1>Other Posts</h1>
      {posts.map(post => (
        <div className="post" key={post.id}>
          <img src={`../images/${post.img}`} alt={post.title} />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  )
}

export default Menu
