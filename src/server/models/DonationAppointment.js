
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonationAppointmentSchema = new Schema({
  donorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65
  },
  bloodType: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  },
  donationDate: {
    type: Date,
    required: true
  },
  donationTime: {
    type: String,
    required: true
  },
  donationCenter: {
    type: String,
    required: true
  },
  previousDonation: {
    type: String,
    required: true,
    enum: ["yes", "no"]
  },
  medicalConditions: {
    type: String
  },
  bloodRequestId: {
    type: Schema.Types.ObjectId,
    ref: 'BloodRequest',
    default: null
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DonationAppointment', DonationAppointmentSchema);
