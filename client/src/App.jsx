import { BrowserRouter, Route, Routes } from "react-router"
import './App.css'
import { Login } from './pages/user/Login'
import { Register } from "./pages/user/Register"
import { Home } from "./pages/user/Home"
import { ChatBot } from "./pages/user/ChatBot"
import { Profile } from "./pages/user/Profile"
import { Support } from "./pages/user/suppoer"
import { Community } from "./pages/user/community"
import { Resources } from "./pages/user/Resources"
import { JournalPage } from "./pages/user/Journal"
import { AppointmentsPage } from "./pages/user/Appointment"
import { BookingForm } from "./pages/user/BookAppointments"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/chatBot" element={<ChatBot/>}/>
        <Route path="/user/profile" element={<Profile/>}/>
        {/* <Route path="/support" element={<Support/>}/> */}
        <Route path="/community" element={<Community/>}/>
        <Route path="/resources" element={<Resources/>}/>
        {/* <Route path="/user/journal" element={<JournalPage/>}/> */}
        <Route path="/user/appointments" element={<AppointmentsPage/>}/>
        <Route path="/counseling-appointment" element={<BookingForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App