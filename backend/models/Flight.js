const { Schema, model } = require('mongoose');

const flightSchema = new Schema({
    fairings: Object,
    links: Object,
    static_fire_date_utc: Date,
    static_fire_date_unix: Number,
    tbd: Boolean,
    net: Boolean,
    window: Number,
    rocket: String,
    success: Boolean,
    details: String,
    crew: Array,
    ships: Array,
    capsules: Array,
    payloads: Array,
    launchpad: String,
    auto_update: Boolean,
    failures: Array,
    flight_number: Number,
    name: String,
    date_utc: Date,
    date_unix: Number,
    date_local: Date,
    date_precision: String,
    upcoming: Boolean,
    cores: Array,
    id: String
});

module.exports = model('Flight', flightSchema);
