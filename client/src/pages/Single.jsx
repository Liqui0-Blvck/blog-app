import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'

import Delete from '../img/delete.png'
import Edit from '../img/edit.png'
import { AuthContext } from '../context/authContext'
import DOMpurify from 'dompurify'

const Single = () => {
  const [post, setPost] = useState({})

  const location = useLocation()
  const navigate = useNavigate()

  const postId = location.pathname.split('/')[2]

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`)
        console.log(res.data)
        setPost(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`)
      Swal.fire({
        icon: 'success',
        title: 'Post Deleted',
        showConfirmButton: false,
        timer: 1500
      }).then(() => navigate('/'))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='single'>
      <div className="content">
        <img src={`../images/${post?.img}`} alt="" />
        <div className="user">
          <img src={post.userImg} alt="" />
        <div className="info">
          <span>{post.username}</span>
          <p>{moment(post.date).fromNow()}</p>
        </div>
        {currentUser.username === post.username && (
          <div className="edit">
          <Link to={'/write?edit=2'} state={post}>
            <img src={Edit} alt="" />
          </Link>
          <img onClick={handleDelete} src={Delete} alt="" />
        </div>
        )}
        </div>
        <h1>{post.title}</h1>
        <p
        dangerouslySetInnerHTML={{
          __html: DOMpurify.sanitize(post.desc)
        }}>
        </p>
      </div>

      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single
