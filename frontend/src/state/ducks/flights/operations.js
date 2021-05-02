import { createAction } from 'redux-api-middleware';
import { v4 as uuidv4 } from 'uuid';
import { normalize, schema } from "normalizr";

import { FLIGHTS_FAILURE, FLIGHTS_REQUEST, FLIGHTS_SUCCESS } from './types';
import types from './types';

const flightSchema = new schema.Entity('flights');
const flightsSchema = new schema.Array(flightSchema);

const getFlights = () => (dispatch) => dispatch(createAction({

    endpoint: `/api/flights`,
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        FLIGHTS_REQUEST,
        {
            type: FLIGHTS_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, flightsSchema);

                return entities;
            },
            meta: { actionType: 'GET_ALL' }
        },
        FLIGHTS_FAILURE]
}));

const addFlight = (flightNumber, name, rocket, details, year) => (dispatch) => dispatch(createAction({
    endpoint: `/api/flights`,
    method: 'POST',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        id: uuidv4(),
        flight_number: flightNumber,
        name: name,
        rocket: rocket,
        success: false,
        details: details,
        date_utc: year
    }),
    types: [
        FLIGHTS_REQUEST,
        {
          type: types.ADD_FLIGHT,
          payload: async (action, state, res) => {
              const json = await res.json();
              const { entities } = normalize(json, flightSchema);
              return entities;
          },
          meta: { actionType: 'GET_ONE' }
        },
        FLIGHTS_FAILURE]
}));

const delFlight = (id) => (dispatch) => dispatch(createAction({
    endpoint: `/api/flights/${id}`,
    method: 'DELETE',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        FLIGHTS_REQUEST,
        {
            type: types.DEL_FLIGHT,
            payload: async () => {
                return { flights: {id} };
            },
            meta: { actionType: 'DEL_ONE' }
        },
        FLIGHTS_FAILURE]
}));

const editFlight = (id, name, rocket, details) => (dispatch) => dispatch(createAction({
    endpoint: `/api/flights/${id}`,
    method: 'PATCH',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        id: id,
        name: name,
        rocket: rocket,
        details: details
    }),
    types: [
        FLIGHTS_REQUEST,
        {
            type: types.EDIT_FLIGHT,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, flightSchema);
                return entities;
            },
            meta: { actionType: 'GET_ONE' }},
        FLIGHTS_FAILURE]
}));

const operations = {
    getFlights,
    addFlight,
    delFlight,
    editFlight
};

export default operations;
