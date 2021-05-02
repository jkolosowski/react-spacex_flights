import { createSelector } from 'reselect';

const getFlights = state => state.entities.flights.allIds.map(id => state.entities.flights.byId[id]);

const flights = createSelector(getFlights, flight => flight);

const getId = state => state.id;

const specificFlight = createSelector([getFlights, getId], (flights, id) =>
    flights.find(flight => flight.id === id));

const selectors = {
    flights,
    specificFlight
};

export default selectors;
