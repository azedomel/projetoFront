
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { api } from './api/api'
import { useNavigate } from 'react-router'
import { Menu } from './components/menu'

function userList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [ error, setError] = useState('')
  const [ editUserid, setEditUserId] = useState(null)
  const [ editData, setEditData] = useState({name: '', email: '', password: ''})



    const fetchUsers = async () => {
      try{ 
        const response = await api.get('/users')
        setUsers(response.data)

      } catch (error){
        setError("Erro ao carregar usuários", error)
      } finally {
        setLoading(false)
      }
    }
    useEffect(() => {
    fetchUsers()

  }, [])



  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(!storedUser) navigate('/')
  }, [navigate])

  const handleDelete = async (id) => {
    try{
      await api.delete(`/users/${id}`)
      setUsers(users.list((unity) => unity.id != id))
    }catch(err){
      setError("Erro ao deletar usuários", err)
    }
  } 

  const handleEditClick = (user) => {
    setEditUserId(user.id)
    setEditData({name: user.name, email: user.email, password: ''}) //não mostra a senha antiga
  } 

  const handleEditChange = (e) => {
    const {name, value} = e.target
    setEditData({...editData, [name]: value})
  }

  const handleUpdate = async (e) => {
    e.preventDefault()  //define que a pagina se previna de relodar enquanto o usuario digite algo
    try{
      await api.put(`/users/${editUserid}`, editData)
      setEditUserId(null)
      fetchUsers()
    }catch(err){
      setError("Erro ao atualizar usuário", err)
    }
  }


   if(loading) return <p>Carregando usuários...</p>
    if(error) return <p>{error}</p>

  return (
    <section>
      <Menu/>
      <div style={{padding: "2rem"}}>
      <h1>Lista de usuários</h1>
      <ul>
        {users.map((user) => (
        <li key={user.id} style={{marginTop: '2rem', marginLeft: '1rem'}}>
          {editUserid === user.id ? (
            <>
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column' }}>
                <input type="text" name='name' value={editData.name} onChange={handleEditChange} required />
                <input type="email" name='email' value={editData.email} onChange={handleEditChange} required />
                <input type="password" name='password' value={editData.password} onChange={handleEditChange} placeholder='Digite uma nova senha' required />
                <button type='submit'>Salvar</button>
                <button type='button' onClick={() => setEditUserId(null)}>Cancelar</button>
              </form> 
              </>
          ) : (
            <>
            <strong>{user.name}</strong> - <i>{user.email}</i>
            <div style={{display: 'inline-flex', gap: '0.5rem', marginLeft: '1rem'}}>
              <button onClick={() => handleEditClick(user)}>Editar</button>
              <button onClick={() => handleDelete(user.id)}>Deletar</button>
            </div>
            </>
          )}
          
        </li>
      ))}
      </ul>
    </div>
    </section>
  )
}

export default userList