import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import './App.module.css'
import { api } from './api/api'

function App() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(storedUser){
      setUser(JSON.parse(storedUser))
      navigate('/userlist')
    }
  }, [])
  const handleLogin = async(e) => {
    e.preventDefault()
    try{
      const response = await api.post('/login', {email, password})
      const user = response.data

      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      navigate('/userlist')

      } catch (error){
        setMessage('Erro no login: ' + (error.response?.data?.message || 'Verifique os dados'))

      }
  }

  return (
    <div style={{padding: '2rem'}}>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" placeholder='Email' value={email} onChange={(e)  => setEmail(e.target.value)} required/>
        <input type="Senha" placeholder='Password' value={password} onChange={(e)  => setPassword(e.target.value)} required/>
        <button type='submit'>Entrar</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default App