import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || null))

  const login = async (input) => {
    const res = await axios.post('http://localhost:8800/api/auth/login', input)
    setCurrentUser(res.data)
  }

  const logout = async (input, navigate) => {
    await axios.post('http://localhost:8800/api/auth/logout')
    Swal.fire({
      icon: 'success',
      title: 'Logout Success',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      setCurrentUser(null)
      navigate('/')
    })
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>
  )
}
