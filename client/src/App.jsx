import { BrowserRouter, Route, Routes } from "react-router"
import './App.css'
import { Login } from './pages/user/Login'
import { Register } from "./pages/user/Register"
import { Home } from "./pages/user/Home"
import { ChatBot } from "./pages/user/ChatBot"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/chatBot" element={<ChatBot/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App