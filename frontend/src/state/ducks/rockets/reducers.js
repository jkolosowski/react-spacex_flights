import rocketTypes from './types';

const rocket = (state = {}, action) => {
    switch (action.type) {
        case rocketTypes.GET_ROCKET:
            return action.payload.rocket;
        default:
            return state;
    }
};

const rocketReducers = { rocket };

export default rocketReducers;
