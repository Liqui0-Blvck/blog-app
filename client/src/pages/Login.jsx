import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
  // control de inputs
  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  // manejo de errores
  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  // manejo de cambios
  const handleChange = e => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // manejo de envios de datos
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await login(input)
      navigate('/')
    } catch (err) {
      setError(err.response.data.error)
    }
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type='text' placeholder='Username' name="username" onChange={handleChange}/>
        <input required type='password' placeholder='Password' name="password" onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}

        <span>Don't you have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login
