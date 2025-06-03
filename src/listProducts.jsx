
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { api } from './api/api'
import { useNavigate } from 'react-router'
import { Menu } from './components/menu'

function listProduct() {
  const navigate = useNavigate();

  const [lists, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [ error, setError] = useState('')
  const [ editListid, setEditListId] = useState(null)
  const [ editData, setEditData] = useState({description: '', price: '', quantity: ''})

    const fetchLists = async () => {
      try{ 
        const response = await api.get('/listProduct')
        setList(response.data)

      } catch (error){
        setError("Erro ao carregar produtos", error)
      } finally {
        setLoading(false)
      }
    }
    useEffect(() => {
    fetchLists()

  }, [])



  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(!storedUser) navigate('/')
  }, [navigate])

  const handleDelete = async (id) => {
    try{
      await api.delete(`/list/${id}`)
      setList(lists.list((unity) => unity.id != id))
    }catch(err){
      setError("Erro ao deletar usuários", err)
    }
  } 

  const handleEditClick = (list) => {
    setEditListId(list.id)
    setEditData({description: list.description, price: list.price, quantity: list.quantity}) //não mostra a senha antiga
  } 

  const handleEditChange = (e) => {
    const {description, value} = e.target
    setEditData({...editData, [description]: value})
  }

  const handleUpdate = async (e) => {
    e.preventDefault()  //define que a pagina se previna de relodar enquanto o usuario digite algo
    try{
      await api.put(`/lists/${editListid}`, editData)
      setEditListId(null)
      fetchLists()
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
        {lists.map((list) => (
        <li key={list.id} style={{marginTop: '2rem', marginLeft: '1rem'}}>
          {editListid === list.id ? (
            <>
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column' }}>
                <input type="text" name='name' value={editData.name} onChange={handleEditChange} required />
                <input type="email" name='email' value={editData.email} onChange={handleEditChange} required />
                <input type="password" name='password' value={editData.password} onChange={handleEditChange} placeholder='Digite uma nova senha' required />
                <button type='submit'>Salvar</button>
                <button type='button' onClick={() => setEditListId(null)}>Cancelar</button>
              </form> 
              </>
          ) : (
            <>
            <strong>{list.name}</strong> - <i>{list.email}</i>
            <div style={{display: 'inline-flex', gap: '0.5rem', marginLeft: '1rem'}}>
              <button onClick={() => handleEditClick(list)}>Editar</button>
              <button onClick={() => handleDelete(list.id)}>Deletar</button>
            </div>
            </>
          )}
          <strong>{list.name} - {list.prie}</strong>
        </li>
      ))}
      </ul>
    </div>
    </section>
  )
}

export default listProduct