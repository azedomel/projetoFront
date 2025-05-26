/* eslint-disable react-hooks/rules-of-hooks */
// import { useState } from 'react'
import './userList.module.css'
import { useEffect, useState } from 'react'
import { api } from './api/api'

function userList() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [ error, setError] = useState('')
  

  useEffect(() => {
    async function fetchUsers(){
      try{ 
        const response = await api.get('/users')
        setUsers(response.data)

      } catch (error){
        setError("Erro ao carregar usuários", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()

  }, [])

   if(loading) return <p>Carregando usuários...</p>
    if(error) return <p>{error}</p>

  return (
    
    <div>
      <h1>Lista de usuários</h1>
      <ol>{users.map((item) => (
        <li key={item.id}>
          <strong>{item.name}</strong> - <i>{item.email}</i>
        </li>
      ))}
        </ol>
    </div>
  )
}

export default userList