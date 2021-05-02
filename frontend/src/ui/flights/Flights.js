import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import selectors from '../../state/ducks/flights/selectors';
import actions from '../../state/ducks/flights/actions';
import operations from '../../state/ducks/flights/operations';
import rocketActions from '../../state/ducks/rockets/actions';


const Flights = ({ flights, delFlight, saveId, saveRocket }) => {

    const [ inputName, setInputName ] = useState('');

    const [ sorted, setSorted ] = useState(false);
    const [ upcoming, setUpcoming ] = useState({ status: 'none' });
    const [ success, setSuccess ] = useState({ status: 'none' });

    const sortFlights = () => {
        return flights
            .filter(flight => flight.name.includes(inputName))
            .filter(flight => upcoming.status !== 'none' ?
                (flight.upcoming === true) : true)
            .filter(flight => success.status !== 'none' ?
                (flight.success === true) : true)
            .sort(sortingByYear);
    };

    const handleName = (event) => {
        setInputName(event.target.value);
    };

    const sortingByYear = (y1, y2) => {
        if (y1.date_utc > y2.date_utc) {
            return sorted ? -1 : 1;
        } if (y1.date_utc < y2.date_utc) {
            return sorted ? 1 : -1;
        } else {
            return 0;
        }
    };

    const filterUpcoming = () => {
        (upcoming.status === 'none') ? setUpcoming({status: 'upcoming'}) : setUpcoming({status: 'none'});
    };

    const filterSuccess = () => {
        (success.status === 'none') ? setSuccess({status: 'true'}) : setSuccess({status: 'none'});
    };

    return (
        <div className={"content mb-6"}>
            <div className={"column is-6 ml-5"}>
                <input
                    type='text'
                    value={inputName}
                    onChange={handleName}
                    placeholder={'Type name of flight'}
                    className={"input is-info input-focus-border-color"}
                />

                <button className={"button mt-3 mr-3 is-info is-outlined"} onClick={() => setSorted(!sorted)}>
                    Sort by newest
                </button>

                <button className={"button m-3 is-success is-outlined"} onClick={filterUpcoming}>
                    Filter upcoming
                </button>

                <button className={"button m-3 is-success is-outlined"} onClick={filterSuccess}>
                    Filter succeded
                </button>

                <Link to={"/add"} className={"button m-3 is-warning"}>
                    Add flight
                </Link>
            </div>

            <ol>
                {flights && sortFlights().map(flight =>
                    <li key={flight.id} className={"box title is-3 has-text-link"}>
                        <Link to={`/details/${flight.id}`} onClick={() => {
                            saveId(flight.id);
                            saveRocket(flight.rocket ? flight.rocket : null);
                        }}>
                            {flight.name}
                        </Link>
                        <p className={"has-text-grey-dark subtitle is-5"}>
                            {flight.details}
                        </p>

                        {flight.links && flight.links.patch.small !== null && (
                            <figure className="image is-128x128">
                                <img src={flight.links.patch.small} alt={""}/>
                            </figure>
                        )}

                        <button className={"button is-danger is-light"} onClick={() => {
                            if (window.confirm("Are you sure?")){
                                delFlight(flight.id);
                            }
                        }}>
                            Remove
                        </button>

                        <Link to={`/edit/${flight.id}`} onClick={() => {
                            saveId(flight.id);
                            saveRocket(flight.rocket ? flight.rocket : null);
                        }}
                              className={"button ml-3 is-primary is-light"}>
                            Edit
                        </Link>
                    </li>)}
            </ol>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        flights: selectors.flights(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        delFlight: (id) => {
            dispatch(operations.delFlight(id));
        },
        saveId: (id) => {
            dispatch(actions.saveId(id));
        },
        saveRocket: (id) => {
            dispatch(rocketActions.saveRocket(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Flights);
