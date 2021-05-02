import { createSelector } from 'reselect';

const getRockets = state => state.entities.rockets.allIds.map(id => state.entities.rockets.byId[id]);

const rockets = createSelector(getRockets, rocket => rocket);

const getRocketId = state => state.rocket;

const getRocket = createSelector([getRockets, getRocketId], (rockets, id) =>
    rockets.find(rocket => rocket.id === id));

const rocketSelectors = {
    rockets,
    getRocket
};

export default rocketSelectors;
