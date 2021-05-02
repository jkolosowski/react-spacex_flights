import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Flights from './ui/flights/Flights';
import FlightDetail from './ui/flights/FlightDetail';
import FlightAdd from './ui/flights/FlightAdd';
import FlightEdit from './ui/flights/flightEdit';
import Rockets from './ui/rockets/Rockets';
import RocketDetail from './ui/rockets/rocketDetail';
import RocketAdd from './ui/rockets/rocketAdd';
import About from './About';

import operations from './state/ducks/flights/operations';
import rocketOperations from './state/ducks/rockets/operations';

const App = ({ fetchFlights, fetchRockets }) => {

    useEffect(() => {
        fetchFlights();
        fetchRockets();
    }, [fetchFlights, fetchRockets]);

    return (
        <div>
            <Router>
                <nav className="navbar is-info is-4">
                    <div className="navbar-brand">
                        <Link className="navbar-item" to={"/"}>
                            <img src="https://logos-world.net/wp-content/uploads/2020/09/SpaceX-Emblem.png" width="200" alt="logo"/>
                            <h2 className={"title is-2 has-text-light"} style={{fontFamily: 'Orbitron'}}>SpaceX Flights</h2>
                        </Link>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-start">
                            <Link className="navbar-item has-text-centered has-text-weight-bold" to={"/"}>
                                Home
                            </Link>

                            <Link className="navbar-item has-text-centered has-text-weight-bold" to={"/rockets"}>
                                Rockets
                            </Link>

                            <Link className="navbar-item has-text-centered has-text-weight-bold" to={"/about"}>
                                About
                            </Link>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Route path="/" exact component={ Flights }/>
                    <Route path="/add" component={ FlightAdd }/>
                    <Route path="/details/:id" exact component={ FlightDetail }/>
                    <Route path="/details/:id/rocket/:rocketId" exact component={ RocketDetail }/>
                    <Route path="/edit/:id" exact component={ FlightEdit }/>
                    <Route path="/rockets" exact component={ Rockets }/>
                    <Route path="/addRocket" exact component={ RocketAdd }/>
                    <Route path="/about" exact component={ About }/>
                </Switch>
            </Router>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFlights: () => {
            dispatch(operations.getFlights());
        },
        fetchRockets: () => {
            dispatch(rocketOperations.getRockets());
        }
    }
};

export default connect(undefined, mapDispatchToProps)(App);
