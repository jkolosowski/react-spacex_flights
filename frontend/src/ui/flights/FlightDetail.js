import React from 'react';

import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import selectors from '../../state/ducks/flights/selectors';
import rocketSelectors from '../../state/ducks/rockets/selectors';
import rocketActions from '../../state/ducks/rockets/actions';


const FlightDetail = ({ flight, rocket, saveRocket }) => {

    let { id } = useParams();

    const date = new Date(flight.date_utc).toLocaleDateString();

    return (
        <div className={"content"}>

            <div className={"column is-3 ml-5"}>
                <Link to={"/"} className={"button mt-3 p-5 is-danger"}>Go back</Link>
            </div>

            <ol key={flight.id} className={"title is-3 has-text-link has-text-centered"}>
                {flight.name}
                <p className={"has-text-grey-dark subtitle is-5"}>
                    {flight.details}
                </p>

                <h2 className={"ml-5 mt-6"}>
                    Flight number: {flight.flight_number}
                </h2>
                <h2 className={flight.success ? "ml-5 has-text-success-dark" : "ml-5 has-text-danger-dark"}>
                    {flight.success ? "Mission succeded" : "Mission failed"}
                </h2>

                {rocket &&
                <div>
                    <h2 className={"has-text-warning-dark is-3"}>
                        Rocket: {rocket.name}
                    </h2>
                    <p>
                        <Link
                            to={`/details/${id}/rocket/${rocket.id}`}
                            className={"has-text-grey-dark subtitle is-5 is-italic"}
                            onClick={() => saveRocket(rocket.id)}>
                            More about this rocket <span role="img" aria-label="rocket">🚀</span>
                        </Link>
                    </p>

                    {flight.date_utc &&
                    <div>
                        <h2 className={"subtitle is-2"}>
                            Date: {date}
                        </h2>
                    </div>}
                </div>}

                {flight.links && (
                    <a href={flight.links.article} className={"has-text-grey-dark subtitle is-5 is-italic"}>
                        More about this flight <span role="img" aria-label="flight">✈</span>
                    </a>
                )}

                <div className={"columns is-centered mt-5"}>
                    {flight.links && flight.links.patch.small !== null && (
                        <figure className="image is-128x128">
                            <img src={flight.links.patch.small} alt={""}/>
                        </figure>
                    )}
                </div>
            </ol>

        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        flight: selectors.specificFlight(state),
        rocket: rocketSelectors.getRocket(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveRocket: (id) => {
            dispatch(rocketActions.saveRocket(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightDetail);
