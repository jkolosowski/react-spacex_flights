const express = require('express');
const router = express.Router();

const Flight = require('../models/Flight');
const Rocket = require('../models/Rocket');

router.get('/', async (req, res) => {
    try {
        const rockets = await Rocket.find();
        return res.send(rockets);
    } catch (error) {
        return res.send({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const rocket = await Rocket.find({ id: req.params.id });
        return res.send(rocket);
    } catch (error) {
        return res.send({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newRocket = await Rocket.create({ ...req.body });
        return res.send(newRocket);
    } catch (error) {
        return res.send({error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Rocket.findOneAndDelete({ id: req.params.id });
        return res.send({ id: req.params.id });
    } catch (error) {
        return res.send({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const patchedRocket = await Rocket.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        return res.send(patchedRocket);
    } catch (error) {
        return res.send({ error: error.message });
    }
});

module.exports = router;
