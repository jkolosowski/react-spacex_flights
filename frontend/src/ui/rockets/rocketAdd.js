import React from 'react';

import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import rocketOperations from '../../state/ducks/rockets/operations';

const RocketAdd = ({ addRocket }) => {

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required!';
        } if (!values.description) {
            errors.description = 'Required!';
        } if (!values.country) {
            errors.country = 'Required!';
        } if (!values.height) {
            errors.height = 'Required!';
        } else if (values.height < 20) {
            errors.height = 'Height must be greater than 20 meters!';
        } if (!values.mass) {
            errors.mass = 'Required!';
        } else if (values.mass < 30000) {
            errors.mass = 'Mass must be greater than 30000 kilos!';
        }
        return errors;
    };

    const saveRocket = (value) => {
        addRocket(value.name, value.description, value.country, value.height, value.mass);
    };

    return (
        <div className={"content"}>
            <div className={"column is-3 ml-5"}>
                <Link to={"/rockets"} className={"button mt-3 p-5 is-danger"}>Go back</Link>
            </div>

            <div className={"field"}>
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        country: '',
                        height: '',
                        mass: ''
                    }}
                    onSubmit={saveRocket}
                    validate={validate}
                >
                    {({handleSubmit, handleReset}) => (
                        <Form onSubmit={handleSubmit} className={"column is-centered mx-6 is-5"}>
                            <label className="label mt-5">Rocket name</label>
                            <div className={"control"}>
                                <Field
                                    type='text'
                                    name={'name'}
                                    placeholder={'Name'}
                                    className={"input"}
                                />
                            </div>
                            <ErrorMessage name='name' />

                            <label className="label mt-5">Description</label>
                            <div className={"control"}>
                                <Field
                                    type='text'
                                    name={'description'}
                                    placeholder={'Description'}
                                    className={"textarea"}
                                />
                            </div>

                            <label className="label mt-5">Country</label>
                            <div>
                                <Field
                                    type='text'
                                    name={'country'}
                                    placeholder={'Country'}
                                    className={"input"}
                                />
                            </div>
                            <ErrorMessage name='country' />

                            <label className="label mt-5">Height</label>
                            <div>
                                <Field
                                    type='number'
                                    name={'height'}
                                    placeholder={'Height (m)'}
                                    className={"input"}
                                />
                            </div>
                            <ErrorMessage name='height' />

                            <label className="label mt-5">Mass</label>
                            <div>
                                <Field
                                    type='number'
                                    name={'mass'}
                                    placeholder={'Mass (m)'}
                                    className={"input"}
                                />
                            </div>
                            <ErrorMessage name='mass' />

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

const mapDispatchToProps = (dispatch) => {
    return {
        addRocket: (name, description, country, height, mass) => {
            dispatch(rocketOperations.addRocket(name, description, country, height, mass));
        }
    }
}

export default connect(undefined, mapDispatchToProps)(RocketAdd);
