const express = require('express');
const router = express.Router();

const Flight = require('../models/Flight');

router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find().populate('rockets');
    return res.send(flights);
  } catch (error) {
    return res.send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newFlight = await Flight.create({ ...req.body });
    return res.send(newFlight);
  } catch (error) {
    return res.send({error: error.message});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.find({ id: req.params.id });
    return res.send(flight);
  } catch (error) {
    return res.send({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Flight.findOneAndDelete({ id: req.params.id });
    return res.send({ id: req.params.id });
  } catch (error) {
    return res.send({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const patchedFlight = await Flight.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    return res.send(patchedFlight);
  } catch (error) {
    return res.send({ error: error.message });
  }
});

module.exports = router;
