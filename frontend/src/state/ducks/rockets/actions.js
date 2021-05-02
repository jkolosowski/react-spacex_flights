import rocketTypes from './types';

const saveRocket = (id) => ({
    type: rocketTypes.GET_ROCKET,
    payload: {
        rocket: id
    }
});

const rocketActions = {
    saveRocket
};

export default rocketActions;
