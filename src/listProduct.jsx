import './Userslist.module.css'

import { useEffect, useState } from 'react'
import { api } from './api/api'
import { Menu } from './components/menu'
import { useNavigate } from 'react-router'

function ListProduct() {
  const navigate = useNavigate()
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editListId, setEditListId] = useState(null)
  const [editData, setEditData] = useState({description: '', price: '', quantity: '', image: ''})

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(!storedUser) navigate('/')
  }, [navigate])

    const fetchLists = async () => {
      try {
        const response = await api.get('/lists')
        setLists(response.data)
      } catch (err) {
        setError('Error ao carregar listas', err)
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchLists()
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/lists/${id}`)
      setLists(lists.filter((u) => u.id !== id))
    } catch (err) {
      setError('Erro ao deletar o usuário', err)
    }
  }

  const handleEditClick = (list) => {
    setEditListId(list.id)
    setEditData({description: list.description, price: list.price, quantity: list.quantity, image: list.image})
  }

  const handleEditChange = (e) => {
    const {name, value} = e.target
    setEditData({...editData, [name]: value})
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const updatedData = {
        description: editData.description,
        price: parseFloat(editData.price),
        quantity: parseInt(editData.quantity, 10)
      }
  
      await api.put(`/lists/${editListId}`, updatedData)
      setEditListId(null)
      fetchLists()
    } catch (err) {
      setError('Erro ao atualizar o produto', err)
    }
  }
  
  if (loading) return <p>Carregando produtos...</p>
  if (error) return <p>{error}</p>

  return (
    <>
    <section>
      <Menu/>
    <div style={{padding: '2rem'}}>
          <h1>Lista de Produtos</h1>
          <ul>
            {lists.map((list) => (
              <li key={list.id} style={{marginTop: '2rem', marginLeft: '1rem'}}>
                {editListId === list.id ? (
                  <form onSubmit={handleUpdate} style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    <input type="text" name='description' value={editData.description} onChange={handleEditChange} required/>
                    <input type="number" name='price' value={editData.price} onChange={handleEditChange} required/>
                    <input type="number" name='quantity' value={editData.quantity} onChange={handleEditChange} required/>
                    <input type="text" name='image' value={editData.image} onChange={handleEditChange} required/>
                    <button type='submit'>Salvar</button>
                    <button type='button' onClick={() => setEditListId(null)}>CANCELAR</button>
                  </form>
                ) : (
                  <>
                <strong>{list.description}</strong> <br/> 
                <i>Preço: {list.price}</i><br /> 
                <i>Quantidade: {list.quantity}</i><br/> 
                <img src={list.image} alt="item" style={{width: 200, height: 'auto'}}/>
                  <div style={{display: 'inline-flex', gap: '0.5rem', marginLeft: '1rem'}}>
                    <button onClick={() => handleEditClick(list)}>EDITAR</button>
                    <button onClick={() => handleDelete(list.id)}>DELETAR</button>
                  </div>
                  </>
                )}
                </li>
            ))}
          </ul>
    </div>
    </section>
    </>
  )
}

export default ListProduct