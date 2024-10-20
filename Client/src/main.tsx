import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import SignIn from './Pages/SignIn.tsx'
import SignUp from './Pages/SignUp.tsx'
import Profile from './Pages/Profile.tsx'
import Transaction from './Pages/Transaction.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<App/>}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/transactions' element={<Transaction />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
