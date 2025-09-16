import { BrowserRouter, Route, Routes } from "react-router"
import './App.css'
import { Login } from './pages/user/Login'
import { Register } from "./pages/user/Register"
import { Home } from "./pages/user/Home"
import { ChatBot } from "./pages/user/ChatBot"
import { Profile } from "./pages/user/Profile"
import { ToastContainer } from "react-toastify"
import { Support } from "./pages/user/Support"
import { Community } from "./pages/user/community"
import { Resources } from "./pages/user/Resources"
import { JournalPage } from "./pages/user/Journal"
import { AppointmentsPage } from "./pages/user/Appointment"
import { BookingForm } from "./pages/user/BookAppointments"
import { AllAppointmentsPage } from "./pages/user/ViewAllAppointments"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/chatBot" element={<ChatBot/>}/>
        <Route path="/user/profile" element={<Profile/>}/>
        <Route path="/support" element={<Support/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/resources" element={<Resources/>}/>
        <Route path="/user/allAppointments" element={<AllAppointmentsPage/>}/>
        <Route path="/user/appointments" element={<AppointmentsPage/>}/>
        <Route path="/book-appointment" element={<BookingForm/>}/>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  )
}

export default App