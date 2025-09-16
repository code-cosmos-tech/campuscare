import { useState, useEffect } from 'react';
// useNavigate is no longer needed
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import './Appointments.css';
import { useAuth } from '../../store/Auth';

export function AllAppointmentsPage() {
    const {userData, tokenBearer, isLoggedIn, URL} = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState('Upcoming');

    const fetchAppointments = async ()=>{
        const resp = await fetch(`${URL}/api/appointment`, {
            method : "GET",
            headers : {
                "Content-Type" : "Application/json",
                "Authorization" : tokenBearer,
            }
        });

        if(resp.ok){
            const data = await resp.json();
            data.sort((a, b) => new Date(a.date) - new Date(b.date));
            setAppointments(data);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const upcomingAppointments = appointments.filter(appt => new Date(appt.date) >= today);
    const pastAppointments = appointments.filter(appt => new Date(appt.date) < today);
    
    const displayedAppointments = activeTab === 'Upcoming' ? upcomingAppointments : pastAppointments;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
            day: date.getDate(),
            full: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        };
    };

    return (
        <>
            <Navbar />
            <main className="appointments-main">
                <div className="appointments-container">
                    <div className="appointments-header">
                        <h1 className="section-heading">All Appointments</h1>
                    </div>

                    <div className="tabs-container">
                        <button className={`tab-btn ${activeTab === 'Upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('Upcoming')}>Upcoming</button>
                        <button className={`tab-btn ${activeTab === 'Past' ? 'active' : ''}`} onClick={() => setActiveTab('Past')}>Past</button>
                    </div>

                    <AnimatePresence>
                        {displayedAppointments.length > 0 ? (
                            <motion.div className="appointments-list">
                                {displayedAppointments.map(appt => {
                                    const { month, day, full } = formatDate(appt.date);
                                    return (
                                    <motion.div
                                        key={appt.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                                        className={`appointment-card ${activeTab === 'Past' ? 'past' : ''}`}
                                    >
                                        <div className="card-main-info">
                                            <div className="card-date">
                                                <span className="month">{month}</span>
                                                <span className="day">{day}</span>
                                            </div>
                                            <div className="card-details">
                                                <h3>{appt.service}</h3>
                                                <p>With {appt.professional}</p>
                                                <p>{full} at {appt.time}</p>
                                            </div>
                                        </div>
                                        {/* The "Cancel" button and its container div have been removed */}
                                    </motion.div>
                                )})}
                            </motion.div>
                        ) : (
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="no-appointments">
                                 <h2 className="section-heading">No {activeTab} Appointments</h2>
                                 <p>There are no appointments to display in this category.</p>
                                 {/* The "Book a New Appointment" button has been removed */}
                             </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </>
    );
}