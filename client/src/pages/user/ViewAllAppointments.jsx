import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import './Appointments.css';
import { useAuth } from '../../store/Auth';

export function AllAppointmentsPage() {
    const { tokenBearer, URL } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState('Upcoming');

    const fetchAppointments = async () => {
        try {
            // FIX 1: Call the correct "/getAll" endpoint
            const resp = await fetch(`${URL}/api/appointment/getAll`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": tokenBearer,
                }
            });

            if (resp.ok) {
                // FIX 2: Access the "data" property from the JSON response
                const responseData = await resp.json();
                const appointmentsArray = responseData.data;

                if (Array.isArray(appointmentsArray)) {
                    appointmentsArray.sort((a, b) => new Date(a.date) - new Date(b.date));
                    setAppointments(appointmentsArray);
                }
            }
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
        }
    };

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

                    <AnimatePresence mode="wait">
                        {displayedAppointments.length > 0 ? (
                            <motion.div
                                key={activeTab}
                                className="appointments-list"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {displayedAppointments.map(appt => {
                                    const { month, day, full } = formatDate(appt.date);
                                    return (
                                        <motion.div
                                            key={appt._id} // Use the unique "_id" from the database
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`appointment-card ${activeTab === 'Past' ? 'past' : ''}`}
                                        >
                                            <div className="card-main-info">
                                                <div className="card-date">
                                                    <span className="month">{month}</span>
                                                    <span className="day">{day}</span>
                                                </div>
                                                <div className="card-details">
                                                    {/* FIX 3: Use the correct field names from your schema */}
                                                    <h3>{appt.department}</h3>
                                                    {/* Your backend populates student and doctor info */}
                                                    <p><b>Patient:</b> {appt.studentId?.username || 'N/A'}</p>
                                                    <p><b>With:</b> {appt.doctorId?.username || 'N/A'}</p>
                                                    <p>{full} at {appt.startTime}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="no-appointments">
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