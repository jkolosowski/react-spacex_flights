import React from 'react';

import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useParams } from 'react-router-dom';

import selectors from '../../state/ducks/flights/selectors';
import operations from '../../state/ducks/flights/operations';
import rocketSelectors from '../../state/ducks/rockets/selectors';


const FlightEdit = ({ flight, editFlight, defaultRocket, rockets }) => {

    let { id } = useParams();

    const saveFlight = (value) => {
        editFlight(id, value.name, value.rocket, value.details);
    };

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required!';
        } else if (!values.details) {
            errors.details = 'Required!';
        }
        return errors;
    };

    return (
        <div className={"content"}>

            <div className={"column is-3 ml-5"}>
                <Link to={"/"} className={"button mt-3 p-5 is-danger"}>Go back</Link>
            </div>

            <div className={"field"}>
                <Formik
                    initialValues={{
                        name: flight.name,
                        rocket: defaultRocket.name,
                        details: flight.details ? flight.details : ''
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
                            <ErrorMessage name='name' className={"help is-success"}/>

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
                            <ErrorMessage name='details' className={"help is-success"}/>

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
        flight: selectors.specificFlight(state),
        rockets: rocketSelectors.rockets(state),
        defaultRocket: rocketSelectors.getRocket(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        editFlight: (id, name, rocket, details) => {
            dispatch(operations.editFlight(id, name, rocket, details));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightEdit);
