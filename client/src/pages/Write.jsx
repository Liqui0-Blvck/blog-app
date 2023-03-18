import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'

const Write = () => {
  const state = useLocation().state

  const navigate = useNavigate()

  const [title, setTitle] = useState(state?.title || '')
  const [value, setValue] = useState(state?.desc || '')
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState(state?.cat || '')

  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post('http://localhost:8800/api/upload', formData)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = localStorage.getItem('user')
    const user = JSON.parse(data)

    const imgUrl = await upload()

    try {
      state
        ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : '',
          date: moment().format('YYYY-MM-DD HH:mm:ss'),
          uid: user.id
        })
        : await axios.post('http://localhost:8800/api/posts', {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : '',
          date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          uid: user.id
        })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  console.log(title)
  console.log(value)
  console.log(cat)
  console.log(file)

  return (
    <div className='write-page'>
      <div className="content">
        <input type="text" placeholder='Add a title' onChange={e => setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className='editor' theme='snow' value={value} onChange={setValue}/>
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: 'none' }} type="file" name='' id='file' onChange={e => setFile(e.target.files[0])}/>
          <label htmlFor="file">Upload Image</label>
          <div className='buttons'>
            <button>Save as a drift</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === 'art'} name='cat' value="art" id='art' onChange={e => setCat(e.target.value)}/>
            <label htmlFor="art">Art</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat === 'science'} name='cat' value="science" id='science' onChange={e => setCat(e.target.value)}/>
            <label htmlFor="science">Science</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat === 'tecnology'} name='cat' value="tecnology" id='tecnology' onChange={e => setCat(e.target.value)}/>
            <label htmlFor="tecnology">Tecnology</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat === 'cinema'} name='cat' value="cinema" id='cinema' onChange={e => setCat(e.target.value)}/>
            <label htmlFor="cinema">Cinema</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat === 'design'} name='cat' value="design" id='design' onChange={e => setCat(e.target.value)}/>
            <label htmlFor="design">Design</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat === 'food'} name='cat' value="food" id='food' onChange={e => setCat(e.target.value)}/>
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
