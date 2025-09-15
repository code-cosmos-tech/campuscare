import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import './Appointments.css';

export function AppointmentsPage() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState('Upcoming');

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('userAppointments')) || [];
        // Sort by date, soonest first
        storedAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
        setAppointments(storedAppointments);
    }, []);

    const handleCancel = (id) => {
        const updatedAppointments = appointments.filter(appt => appt.id !== id);
        setAppointments(updatedAppointments);
        localStorage.setItem('userAppointments', JSON.stringify(updatedAppointments));
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for comparison

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
                        <h1 className="section-heading">My Appointments</h1>
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
                                        {activeTab === 'Upcoming' && (
                                            <div className="card-actions">
                                                <button className="btn btn-danger" onClick={() => handleCancel(appt.id)}>Cancel</button>
                                            </div>
                                        )}
                                    </motion.div>
                                )})}
                            </motion.div>
                        ) : (
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="no-appointments">
                                <h2 className="section-heading">No {activeTab} Appointments</h2>
                                <p>It looks like you don't have any appointments scheduled.</p>
                                <button className="btn btn-primary" onClick={() => navigate('/appointments/new')}>Book a New Appointment</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </>
    );
}