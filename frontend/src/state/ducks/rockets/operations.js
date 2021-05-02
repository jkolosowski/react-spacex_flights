import { createAction } from 'redux-api-middleware';
import { v4 as uuidv4 } from 'uuid';
import { normalize, schema } from 'normalizr';

import { ROCKETS_REQUEST, ROCKETS_FAILURE, ROCKETS_SUCCESS } from './types';
import types from './types';

const rocketSchema = new schema.Entity('rockets');
const rocketsSchema = new schema.Array(rocketSchema);

const getRockets = () => (dispatch) => dispatch(createAction({
    endpoint: `/api/rockets`,
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        ROCKETS_REQUEST,
        {
          type: ROCKETS_SUCCESS,
          payload: async (action, state, res) => {
              const json = await res.json();
              const { entities } = normalize(json, rocketsSchema);
              return entities;
          },
          meta: { actionType: 'GET_ALL' }
        },
        ROCKETS_FAILURE]
}));

const addRocket = (name, description, country, height, mass) => (dispatch) => dispatch(createAction({
    endpoint: `/api/rockets`,
    method: 'POST',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        id: uuidv4(),
        name: name,
        description: description,
        country: country,
        height: height,
        mass: mass
    }),
    types: [
        ROCKETS_REQUEST,
        {
            type: types.ADD_ROCKET,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, rocketSchema);
                return entities;
            },
            meta: { actionType: 'GET_ONE' }
        },
        ROCKETS_FAILURE]
}));

const delRocket = (id) => (dispatch) => dispatch(createAction({
    endpoint: `/api/rockets/${id}`,
    method: 'DELETE',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        ROCKETS_REQUEST,
        {
            type: types.DEL_ROCKET,
            payload: async () => {
                return { rockets: {id} };
            },
            meta: { actionType: 'DEL_ONE' }
        },
        ROCKETS_FAILURE]
}));

const rocketOperations = {
    getRockets,
    addRocket,
    delRocket
};

export default rocketOperations;
