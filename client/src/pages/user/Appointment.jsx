import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import './Appointments.css';
import { useAuth } from '../../store/Auth';

export function AppointmentsPage() {
    const { tokenBearer, URL, userData } = useAuth();
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState('Upcoming');

    const fetchAppointments = async () => {
        if (!userData) {
            return;
        }

        try {
            const resp = await fetch(`${URL}/api/appointment/${userData._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": tokenBearer,
                }
            });

            if (resp.ok) {
                const responseData = await resp.json(); 
                const appointmentsArray = responseData.data; 

                if (Array.isArray(appointmentsArray)) {
                    const sortedData = appointmentsArray.sort((a, b) => new Date(a.date) - new Date(b.date));
                    setAppointments(sortedData);
                } else {
                    console.error("API did not return an array inside the 'data' property.");
                    setAppointments([]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [userData]);

    // ... The rest of your component remains the same
    const handleRedirectToBooking = () => {
        navigate('/book-appointment');
    };

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
        // ... Your JSX remains the same
        <>
            <Navbar />
            <main className="appointments-main">
                <div className="appointments-container">
                    <div className="appointments-header">
                        <h1 className="section-heading">My Appointments</h1>
                        <button className="btn btn-primary" onClick={handleRedirectToBooking}>
                            Book an Appointment
                        </button>
                    </div>

                    <div className="tabs-container">
                        <button className={`tab-btn ${activeTab === 'Upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('Upcoming')}>Upcoming</button>
                        <button className={`tab-btn ${activeTab === 'Past' ? 'active' : ''}`} onClick={() => setActiveTab('Past')}>Past</button>
                    </div>

                    <AnimatePresence mode="wait">
                        {displayedAppointments.length > 0 ? (
                            <motion.div
                                key={activeTab}
                                className="appointments-list"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {displayedAppointments.map(appt => {
                                    const { month, day, full } = formatDate(appt.date);
                                    return (
                                        <motion.div
                                            key={appt._id}
                                            layout
                                            className={`appointment-card ${activeTab === 'Past' ? 'past' : ''}`}
                                        >
                                            <div className="card-main-info">
                                                <div className="card-date">
                                                    <span className="month">{month}</span>
                                                    <span className="day">{day}</span>
                                                </div>
                                                <div className="card-details">
                                                    <h3>{appt.department}</h3>
                                                    <p>With {appt.doctorId?.name || 'Dr. Info Unavailable'}</p>
                                                    <p>{full} at {appt.startTime}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        ) : (
                           <motion.div
                                key="no-appointments"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="no-appointments"
                            >
                                <h2 className="section-heading">No {activeTab} Appointments</h2>
                                <p>There are no appointments to display in this category.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </>
    );
}