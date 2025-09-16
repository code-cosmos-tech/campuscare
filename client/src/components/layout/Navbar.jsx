import { NavLink } from "react-router-dom"; // Corrected import
import { useAuth } from "../../store/Auth";
import { useState } from "react";
import "./Navbar.css"; // Make sure to import the stylesheet

export function Navbar() {
    // ... your existing component code ...
    // (The JSX and logic you provided are perfect)
    const [show, setShow] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const { isLoggedIn, logout, userData, isAdmin} = useAuth();
 
    const handleShow = (e) => {
        if (!hasInteracted)
            setHasInteracted(true);
        setShow(!show);
    }
 
    if(!userData){
        localStorage.removeItem("accessToken")
    }

    return <section className="navbar-container">
        <div className="nav-container">
            <span className="logo">
                <NavLink className="nav-link" to={'/'}>
                    <i className="fa-solid fa-heart-circle-check"></i> MindBridge
                </NavLink>
            </span>
            
            <div className="links">
                <span><NavLink className="nav-link" to={'/'}>Home</NavLink></span>
                <span><NavLink className="nav-link" to={'/resources'}>Resources</NavLink></span>
                <span><NavLink className="nav-link" to={'/support'}>Support</NavLink></span>
                <span><NavLink className="nav-link" to={'/community'}>Community</NavLink></span>
                {/* <span><NavLink className="nav-link" to={'/professionals'}>Professionals</NavLink></span> */}
                {
                    !isLoggedIn ?
                    <>
                        <span><NavLink className="nav-link login-btn" to={'/login'}>Login</NavLink></span>
                        <span><NavLink className="nav-link register-btn" to={'/register'}>Register</NavLink></span>
                    </> :
                    <>
                        <span><NavLink to={'/user/profile'} className="nav-link"><i className="fa-regular fa-user"></i> Profile</NavLink></span>
                        <span><NavLink to={'/user/appointments'} className="nav-link"><i className="fa-regular fa-calendar-check"></i> Appointments</NavLink></span>
                        {
                            isAdmin && (
                                <span><NavLink to={'/user/allAppointments'} className="nav-link"><i className="fa-regular fa-book"></i> All Appointments</NavLink></span>
                            )
                        }
                        <span><NavLink to={'/'} onClick={logout} className="nav-link logout-btn">Logout</NavLink></span>
                    </>
                }
            </div>
 
            <div className="sidebar-toggle">
                <span className="menu-icon" onClick={handleShow}>
                    <i className="fa-solid fa-bars"></i>
                </span>
                
                <div className={`sidebar ${hasInteracted ? (show ? "sidebar-show" : "sidebar-hide") : ""}`}>
                    <div className="sidebar-header">
                        <span className="close-icon" onClick={handleShow}>
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                    </div>
                    
                    <div className="sidebar-content">
                        {isLoggedIn && (
                            <div className="sidebar-user-section">
                                <span><NavLink to={'/user/profile'} onClick={handleShow} className="nav-link"><i className="fa-regular fa-user"></i> Profile</NavLink></span>
                                <span><NavLink to={'/user/appointments'} onClick={handleShow} className="nav-link"><i className="fa-regular fa-calendar-check"></i> Appointments</NavLink></span>
                                <span><NavLink to={'/user/journal'} onClick={handleShow} className="nav-link"><i className="fa-regular fa-book"></i> Journal</NavLink></span>
                            </div>
                        )}
                        
                        <div className="sidebar-main-links">
                            <span><NavLink onClick={handleShow} className="nav-link" to={'/'}>Home</NavLink></span>
                            <span><NavLink onClick={handleShow} className="nav-link" to={'/resources'}>Resources</NavLink></span>
                            <span><NavLink onClick={handleShow} className="nav-link" to={'/support'}>Support</NavLink></span>
                            <span><NavLink onClick={handleShow} className="nav-link" to={'/community'}>Community</NavLink></span>
                            <span><NavLink onClick={handleShow} className="nav-link" to={'/professionals'}>Professionals</NavLink></span>
                        </div>
                        
                        <div className="sidebar-auth-links">
                            {!isLoggedIn ? (
                                <>
                                    <span><NavLink onClick={handleShow} className="nav-link" to={'/login'}>Login</NavLink></span>
                                    <span><NavLink onClick={handleShow} className="nav-link" to={'/register'}>Register</NavLink></span>
                                </>
                            ) : (
                                <span><NavLink to={'/'} onClick={() => { logout(); handleShow() }} className="nav-link logout-link">Logout</NavLink></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}