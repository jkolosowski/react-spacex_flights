import React from 'react';

import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

import selectors from '../../state/ducks/flights/selectors';
import operations from '../../state/ducks/flights/operations';
import rocketSelectors from '../../state/ducks/rockets/selectors';


const FlightAdd = ({ addFlight, flights, rockets }) => {

    const years = [ 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035 ];

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required!';
        } if (!values.email) {
            errors.email = 'Required!';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        return errors;
    };

    const saveFlight = (value) => {
        addFlight(flights.length + 1, value.name, value.rocket, value.details, value.year);
    };

    return (
        <div className={"content"}>

            <div className={"column is-3 ml-5"}>
                <Link to={"/"} className={"button mt-3 p-5 is-danger"}>Go back</Link>
            </div>

            <div className={"field"}>
                <Formik
                    initialValues={{
                        name: '',
                        rocket: '',
                        details: '',
                        year: 2021,
                        email: ''
                    }}
                    onSubmit={saveFlight}
                    validate={validate}
                >
                    {({handleSubmit, handleReset}) => (
                        <Form onSubmit={handleSubmit} className={"column is-centered mx-6 is-5"}>
                            <label className="label mt-5">Mission name</label>
                            <div className={"control"}>
                                <Field
                                    type='text'
                                    name={'name'}
                                    placeholder={'Name'}
                                    className={"input"}
                                />
                            </div>
                            <ErrorMessage name='name' />

                            <label className="label mt-5">Rocket</label>
                            <div className={"control is-5"}>
                                <div className="field-body">
                                    <div className="field is-narrow">
                                        <div className="select is-fullwidth">
                                            <Field as='select' name={'rocket'} className={"select"}>
                                                {rockets && rockets.map((rocket, index) =>
                                                    <option key={index} value={rocket.id}>{rocket.name}</option>
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <label className="label mt-5">Details</label>
                            <div className={"control"}>
                                <Field
                                    type='text'
                                    name={'details'}
                                    placeholder={'Details'}
                                    className={"textarea"}
                                />
                            </div>

                            <label className="label mt-5">Year</label>
                            <div className={"control is-5"}>
                                <div className="field-body">
                                    <div className="field is-narrow">
                                        <div className="select is-fullwidth">
                                            <Field as='select' name={'year'} className={"select"}>
                                                {years.map((year, index) =>
                                                        <option key={index} value={year}>{year}</option>
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <label className="label mt-5">Your e-mail</label>
                            <div>
                                <Field
                                    type='text'
                                    name={'email'}
                                    placeholder={'E-mail'}
                                    className={"input"}
                                />
                            </div>
                            <ErrorMessage name='email' />

                            <button onClick={handleReset} className={"button mt-6 mr-3 is-danger is-outlined"}>
                                Reset
                            </button>

                            <button type='submit' className={"button mt-6 is-success is-focused"}>
                                Save
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        flights: selectors.flights(state),
        rockets: rocketSelectors.rockets(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFlight: (name, rocket, details, year) => {
            dispatch(operations.addFlight(name, rocket, details, year));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightAdd);
