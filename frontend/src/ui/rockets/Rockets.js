import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import rocketSelectors from '../../state/ducks/rockets/selectors';
import rocketOperations from '../../state/ducks/rockets/operations';

const Rockets = ({ rockets, delRocket }) => {


    return (
        <div>
            <Link to={"/addRocket"} className={"button ml-6 mt-3 is-warning"}>
                Add rocket
            </Link>
            <ol>
                {rockets.map(rocket =>
                    <li key={rocket.id} className={"box has-text-centered m-6 "}>
                        <h2 className={"title is-3 has-text-success"}>
                            {rocket.name}
                        </h2>
                        <h4 className={"subtitle is-5"}>
                            Country: {rocket.country}
                        </h4>
                        <p className={"subtitle is-5 has-text-warning-dark"}>
                            Height: {rocket.height} m
                        </p>
                        <p className={"subtitle is-5 has-text-danger-dark"}>
                            Mass: {rocket.mass} kg
                        </p>
                        <button className={"button is-danger is-light"} onClick={() => {
                            if (window.confirm("Are you sure?")){
                                delRocket(rocket.id);
                            }
                        }}>
                            Remove
                        </button>
                    </li>)}
            </ol>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        rockets: rocketSelectors.rockets(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        delRocket: (id) => {
            dispatch(rocketOperations.delRocket(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Rockets);
