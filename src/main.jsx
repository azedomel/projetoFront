import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';

import './index.css'
import App from './App.jsx'
import UserList from './userList.jsx';
import List from './list.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/userlist' element={<UserList/>}/>
        <Route path='/list' element={<List/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)