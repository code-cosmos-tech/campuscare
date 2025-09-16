const Appointment = require("../db-models/appointments");

const createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('studentId', 'username email')
            .populate('doctorId', 'username email');
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.find({studentId: req.params.id})
        
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        console.error('Error fetching appointment:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {createAppointment, getAppointments, updateAppointment, getAppointmentById, deleteAppointment};