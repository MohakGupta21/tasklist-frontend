import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NoPage from './pages/NoPage'
import Details from './pages/Details'
import Edit from './pages/Edit'
import Add from './pages/Add'
import useTaskStore from './store/user'
import { useEffect } from 'react'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="add" element={<Add />} />
          
          <Route path="details/:id" element={<Details />} />
          <Route path="edit/:id" element={<Edit/>}/>
          <Route path="*" element={<NoPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
