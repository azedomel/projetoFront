/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { api } from './api/api'

function List() {

  const [list, setlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [ error, setError] = useState('')
  

  useEffect(() => {
    async function fetchlist(){
      try{ 
        const response = await api.get('/list')
        setlist(response.data)

      } catch (error){
        setError("Erro ao carregar listas", error)
      } finally {
        setLoading(false)
      }
    }
    fetchlist()

  }, [])

   if(loading) return <p>Carregando listas...</p>
    if(error) return <p>{error}</p>

  return (
    
    <div>
      <h1>Lista de listas</h1>
      <ol>{list.map((item) => (
        <li key={item.id}>
          <strong>{item.description}</strong> - <i>{item.price}</i>
          <p>Quantidade: {item.quantity}</p>
          <img src={item.image} style={{height: "400px"}}/>
        </li>
      ))}
        </ol>
    </div>
  )
}

export default List