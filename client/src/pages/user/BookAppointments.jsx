import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import './Appointments.css';
import { useAuth } from '../../store/Auth';

// --- Corrected Mock Data ---
const mockDepartments = ["Counseling Session", "Academic Advising", "Health Check-up"];
const mockProfessionals = [
    // FIX: Replaced IDs with valid 24-character hexadecimal strings
    { _id: "65a8e63a1c9d4400005b8e1a", name: "Dr. Anya Sharma", department: "Counseling Session" },
    { _id: "65a8e63a1c9d4400005b8e1b", name: "Mr. Rohan Gupta", department: "Counseling Session" },
    { _id: "65a8e63a1c9d4400005b8e1c", name: "Prof. Meera Desai", department: "Academic Advising" },
    { _id: "65a8e63a1c9d4400005b8e1d", name: "Dr. Vikram Singh", department: "Academic Advising" },
    { _id: "65a8e63a1c9d4400005b8e1e", name: "Dr. Priya Patel", department: "Health Check-up" }
];
const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
// ---------------------------------

export function BookingForm() {
    const navigate = useNavigate();
    const { userData, tokenBearer, URL } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // State
    const [department, setDepartment] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [studnetId, setStudnetId] = useState('');
    const [appointmentType, setAppointmentType] = useState('in-person');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [reasonForVisit, setReasonForVisit] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [filteredProfessionals, setFilteredProfessionals] = useState([]);

    useEffect(() => {
        if (department) {
            const professionals = mockProfessionals.filter(p => p.department === department);
            setFilteredProfessionals(professionals);
            setDoctorId('');
        } else {
            setFilteredProfessionals([]);
        }
    }, [department]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!department || !doctorId || !date || !startTime || !reasonForVisit) {
            alert("Please fill out all required fields before submitting.");
            return;
        }
        setIsLoading(true);

        const [timePart, ampm] = startTime.split(' ');
        const [hour] = timePart.split(':');
        let endHour = parseInt(hour, 10) + 1;

        if (endHour === 12) ampm === 'AM' ? 'PM' : 'AM';
        if (endHour > 12) endHour -= 12;
        const endTime = `${endHour}:00 ${ampm}`;
        
        const symptomsArray = symptoms.split(',').map(symptom => symptom.trim()).filter(Boolean);
        const appointmentData = {
            studentId: userData._id,
            doctorId,
            department,
            appointmentType,
            date,
            startTime,
            endTime,
            reasonForVisit,
            symptoms: symptomsArray,
        };

        try {
            const response = await fetch(`${URL}/api/appointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenBearer,
                },
                body: JSON.stringify(appointmentData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Booking failed. Please try again.');
            }

            alert("Appointment booked successfully! ✅");
            navigate('/user/appointments');

        } catch (error) {
            console.error("Booking Error:", error);
            alert(`An error occurred: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Date Restriction Logic ---
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    const minDateString = today.toISOString().split("T")[0];
    const maxDateString = maxDate.toISOString().split("T")[0];
    // -----------------------------

    return (
        <>
            <Navbar />
            <main className="appointments-main">
                <div className="appointments-container">
                    <h1 className="section-heading" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        Book a New Appointment
                    </h1>
                    <div className="booking-form-container">
                        <form onSubmit={handleSubmit}>
                            {/* Department (Service) Selection */}
                            <div className="form-group">
                                <label htmlFor="department" className="form-label">1. Select Department/Service</label>
                                <select id="department" className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                                    <option value="" disabled>Choose a department...</option>
                                    {mockDepartments.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>

                            {/* Professional (Doctor) Selection */}
                            {department && (
                                <div className="form-group">
                                    <label htmlFor="professional" className="form-label">2. Choose a Professional</label>
                                    <select id="professional" className="form-select" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
                                        <option value="" disabled>Select a professional...</option>
                                        {filteredProfessionals.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                                    </select>
                                </div>
                            )}

                            {/* Appointment Type Selection */}
                             {doctorId && (
                                <div className="form-group">
                                    <label className="form-label">3. Select Appointment Type</label>
                                    <div className="radio-group">
                                        <label><input type="radio" value="in-person" checked={appointmentType === 'in-person'} onChange={(e) => setAppointmentType(e.target.value)} /> In-Person</label>
                                        <label><input type="radio" value="telehealth" checked={appointmentType === 'telehealth'} onChange={(e) => setAppointmentType(e.target.value)} /> Telehealth</label>
                                    </div>
                                </div>
                            )}

                             {/* Reason for Visit */}
                             {appointmentType && (
                                <div className="form-group">
                                    <label htmlFor="reason" className="form-label">4. Reason for Visit</label>
                                    <textarea id="reason" className="form-select" value={reasonForVisit} onChange={(e) => setReasonForVisit(e.target.value)} required rows="3" placeholder="e.g., Annual check-up, course selection help..."></textarea>
                                </div>
                            )}
                            
                             {/* Symptoms */}
                             {reasonForVisit && (
                                <div className="form-group">
                                    <label htmlFor="symptoms" className="form-label">5. Symptoms (Optional)</label>
                                    <input type="text" id="symptoms" className="form-select" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="e.g., Headache, fever (comma-separated)" />
                                </div>
                            )}

                            {/* Date Selection */}
                            {symptoms && (
                                <div className="form-group">
                                    <label htmlFor="date" className="form-label">6. Select a Date</label>
                                    <input
                                        type="date"
                                        id="date"
                                        className="form-select"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                        min={minDateString}
                                        max={maxDateString}
                                    />
                                </div>
                            )}
                            
                            {/* Time Selection */}
                            {date && (
                                <div className="form-group">
                                    <label className="form-label">7. Select a Time</label>
                                    <div className="time-slots">
                                        {availableTimes.map(t => (
                                            <button type="button" key={t} className={`time-slot-btn ${startTime === t ? 'selected' : ''}`} onClick={() => setStartTime(t)}>
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/appointments')}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={!startTime || isLoading}>
                                    {isLoading ? 'Booking...' : 'Confirm Booking'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}