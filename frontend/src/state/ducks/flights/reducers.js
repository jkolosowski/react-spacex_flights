import types from './types';

const id = (state = {}, action) => {
    switch (action.type) {
        case types.SAVE_ID:
            return action.payload.id;
        default:
            return state;
    }
};

const reducers = { id };

export default reducers;
