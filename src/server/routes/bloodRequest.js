
const express = require('express');
const router = express.Router();
const BloodRequest = require('../models/BloodRequest');

// @route   POST api/blood-requests
// @desc    Create a new blood request
// @access  Private (blood banks only)
router.post('/', async (req, res) => {
  try {
    const {
      patientName,
      hospitalName,
      bloodType,
      unitsNeeded,
      urgency,
      reason,
      contactName,
      contactPhone,
      contactEmail,
      bloodBankId
    } = req.body;

    // Create new blood request
    const newRequest = new BloodRequest({
      patientName,
      hospitalName,
      bloodType,
      unitsNeeded,
      urgency,
      reason,
      contactName,
      contactPhone,
      contactEmail,
      bloodBankId
    });

    const bloodRequest = await newRequest.save();
    res.status(201).json(bloodRequest);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/blood-requests
// @desc    Get all blood requests
// @access  Public
router.get('/', async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: 'pending' })
      .sort({ urgency: 1, createdAt: 1 }); // Sort by urgency, then creation date
    res.json(requests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/blood-requests/:id
// @desc    Get blood request by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const bloodRequest = await BloodRequest.findById(req.params.id);
    
    if (!bloodRequest) {
      return res.status(404).json({ msg: 'Blood request not found' });
    }
    
    res.json(bloodRequest);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blood request not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/blood-requests/bloodbank/:bloodBankId
// @desc    Get all requests created by a specific blood bank
// @access  Private
router.get('/bloodbank/:bloodBankId', async (req, res) => {
  try {
    const requests = await BloodRequest.find({ 
      bloodBankId: req.params.bloodBankId 
    }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
