import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Register = () => {
  // control de inputs
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: ''
  })

  // manejo de errores
  const [err, setError] = useState(null)

  const navigate = useNavigate()

  // manejo de cambios
  const handleChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // manejo de envios de datos
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:8800/api/auth/register', input)
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado correctamente',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/login')
      })
    } catch (err) {
      setError(err.response.data.error)
    }
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type='text' placeholder='Username' name="username" onChange={handleChange}/>
        <input required type='email' placeholder='Email' name="email" onChange={handleChange}/>
        <input required type='password' placeholder='Password' name="password" onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}

        <span>Don't you have an account? <Link to="/login">Register</Link></span>
      </form>
    </div>
  )
}

export default Register
