const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    department: {
        type: String,
        required: true
    },
    appointmentType: {
        type: String,
        enum: ['in-person', 'telehealth'],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
        required: true,
        default: 'scheduled'
    },
    reasonForVisit: {
        type: String,
        required: true
    },
    symptoms: {
        type: [String]
    },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
