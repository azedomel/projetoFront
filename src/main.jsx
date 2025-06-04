import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';

import './index.css'
import App from './App'
import UsersList from './usersList';
import ListProduct from './listProduct';
import Dashboard from './dashboard';
import Contact from './Contact'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/usersList' element={<UsersList/>}/>
        <Route path='/listProduct' element={<ListProduct/>}/>
        <Route path='/Contact' element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)