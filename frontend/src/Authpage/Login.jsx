import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('name', res.data.name)
      console.log(email)
      navigate('/')
    } catch (err) {
      alert(err || 'Login failed')
    }
  }

  return (
    <>
      <div className='back_ground'>
        <form onSubmit={handleSubmit} className='Login_page'>
          <h2>Login</h2>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Login</button>
        </form>
        <p style={{ fontSize: 20 }}>
          Don't have an account?{' '}
          <Link to='/register' id='links'>
            Sign up
          </Link>
        </p>
      </div>
    </>
  )
}

export default Login
