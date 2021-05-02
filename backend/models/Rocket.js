const { Schema, model } = require('mongoose');

const rocketSchema = new Schema({
    height: Number,
    diameter: Object,
    mass: Number,
    name: String,
    first_flight: Date,
    country: String,
    company: String,
    wikipedia: String,
    description: String,
    id: String
});

module.exports = model('Rocket', rocketSchema);
