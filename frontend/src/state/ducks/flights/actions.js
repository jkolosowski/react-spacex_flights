import types from './types';

const saveId = (id) => ({
    type: types.SAVE_ID,
    payload: {
        id: id
    }
});

const actions = {
    saveId
};

export default actions;
