import React from 'react';

import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import rocketSelectors from '../../state/ducks/rockets/selectors';


const RocketDetail = ({ rocket }) => {

    const { id } = useParams();

    const date = new Date(rocket.first_flight).toLocaleDateString();

    return (
        <div className={"content"}>

            <div className={"column is-3 ml-5"}>
                <Link to={`/details/${id}`} className={"button mt-3 p-5 is-danger"}>Go back</Link>
            </div>

            <ol key={rocket.id} className={"title is-3 has-text-link has-text-centered has-text-success"}>
                {rocket.name}
                <p className={"has-text-grey-dark subtitle is-5"}>
                    {rocket.description}
                </p>

                <h2 className={"subtitle is-3 ml-5 mt-6"}>
                    Country: {rocket.country}
                </h2>

                <h2 className={"subtitle is-3 ml-5 mt-6 has-text-warning-dark"}>
                    Height: {rocket.height} m
                </h2>

                <h2 className={"subtitle is-3 ml-5 mt-6 has-text-danger-dark"}>
                    Mass: {rocket.mass} kg
                </h2>

                {rocket.first_flight &&
                <div>
                    <h2 className={"subtitle is-3 ml-5 mt-6"}>
                        First flight: {date}
                    </h2>
                </div>}
            </ol>

        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        rocket: rocketSelectors.getRocket(state)
    }
};

export default connect(mapStateToProps)(RocketDetail);
