import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';

import './index.css'
import App from './App'
import UsersList from './usersList';
import List from './list';
import Dashboard from './dashboard';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/usersList' element={<UsersList/>}/>
        <Route path='/list' element={<List/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)