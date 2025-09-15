import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import './Appointments.css';

// --- Mock Data (in a real app, this would come from an API) ---
const availableServices = {
    "Counseling Session": {
        professionals: ["Dr. Anya Sharma", "Mr. Rohan Gupta"],
    },
    "Academic Advising": {
        professionals: ["Prof. Meera Desai", "Dr. Vikram Singh"],
    },
    "Health Check-up": {
        professionals: ["Dr. Priya Patel"],
    }
};
const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
// -------------------------------------------------------------

export function BookingForm() {
    const navigate = useNavigate();
    const [service, setService] = useState('');
    const [professional, setProfessional] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleServiceChange = (e) => {
        setService(e.target.value);
        setProfessional(''); // Reset professional when service changes
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!service || !professional || !date || !time) {
            alert("Please fill out all fields.");
            return;
        }

        const newAppointment = {
            id: Date.now().toString(),
            service,
            professional,
            date,
            time
        };

        const existingAppointments = JSON.parse(localStorage.getItem('userAppointments')) || [];
        localStorage.setItem('userAppointments', JSON.stringify([...existingAppointments, newAppointment]));
        
        navigate('/appointments');
    };

    return (
        <>
            <Navbar />
            <main className="appointments-main">
                <div className="appointments-container">
                    <h1 className="section-heading" style={{textAlign: 'center', marginBottom: '2rem'}}>
                        Book a New Appointment
                    </h1>
                    <div className="booking-form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="service" className="form-label">1. Select a Service</label>
                                <select id="service" className="form-select" value={service} onChange={handleServiceChange} required>
                                    <option value="" disabled>Choose a service...</option>
                                    {Object.keys(availableServices).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            {service && (
                                <div className="form-group">
                                    <label htmlFor="professional" className="form-label">2. Choose a Professional</label>
                                    <select id="professional" className="form-select" value={professional} onChange={(e) => setProfessional(e.target.value)} required>
                                        <option value="" disabled>Select a professional...</option>
                                        {availableServices[service].professionals.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                            )}

                             {professional && (
                                <div className="form-group">
                                    <label htmlFor="date" className="form-label">3. Select a Date</label>
                                     <input type="date" id="date" className="form-select" value={date} onChange={(e) => setDate(e.target.value)} required min={new Date().toISOString().split("T")[0]} />
                                </div>
                            )}
                            
                            {date && (
                                <div className="form-group">
                                    <label className="form-label">4. Select a Time</label>
                                    <div className="time-slots">
                                        {availableTimes.map(t => (
                                            <button type="button" key={t} className={`time-slot-btn ${time === t ? 'selected' : ''}`} onClick={() => setTime(t)}>
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/appointments')}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={!time}>Confirm Booking</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}