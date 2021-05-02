const GET_ROCKET = 'rocket/GET_ROCKET';
const ADD_ROCKET = 'rocket/ADD_ROCKET';
const DEL_ROCKET = 'rocket/DEL_ROCKET';

export const ROCKETS_REQUEST = '@@rocket/ROCKETS_REQUEST';
export const ROCKETS_SUCCESS = '@@rocket/ROCKETS_SUCCESS';
export const ROCKETS_FAILURE = '@@rocket/ROCKETS_FAILURE';

const rocketTypes = {
    GET_ROCKET,
    ADD_ROCKET,
    DEL_ROCKET,
    ROCKETS_FAILURE,
    ROCKETS_REQUEST,
    ROCKETS_SUCCESS
};

export default rocketTypes;
