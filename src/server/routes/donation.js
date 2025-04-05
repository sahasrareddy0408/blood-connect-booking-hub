
const express = require('express');
const router = express.Router();
const DonationAppointment = require('../models/DonationAppointment');
const BloodRequest = require('../models/BloodRequest');

// @route   POST api/donations
// @desc    Create a new donation appointment
// @access  Private
router.post('/', async (req, res) => {
  try {
    const {
      donorId,
      name,
      email,
      phone,
      age,
      bloodType,
      donationDate,
      donationTime,
      donationCenter,
      previousDonation,
      medicalConditions,
      bloodRequestId
    } = req.body;

    // Create new appointment
    const newAppointment = new DonationAppointment({
      donorId,
      name,
      email,
      phone,
      age,
      bloodType,
      donationDate,
      donationTime,
      donationCenter,
      previousDonation,
      medicalConditions,
      bloodRequestId
    });

    const appointment = await newAppointment.save();

    // If linked to a blood request, update that request
    if (bloodRequestId) {
      const bloodRequest = await BloodRequest.findById(bloodRequestId);
      if (bloodRequest) {
        // You could update status or other fields here based on your business logic
      }
    }

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/donations
// @desc    Get all donation appointments
// @access  Private (admin only in production)
router.get('/', async (req, res) => {
  try {
    const appointments = await DonationAppointment.find().sort({ donationDate: 1 });
    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/donations/donor/:donorId
// @desc    Get all donations for a donor
// @access  Private
router.get('/donor/:donorId', async (req, res) => {
  try {
    const appointments = await DonationAppointment.find({ 
      donorId: req.params.donorId 
    }).sort({ donationDate: -1 });
    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
