import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from './Field';
import { fieldValues } from './fieldsValues';
import { validate } from './validate';

const renderFields = () => {
    return fieldValues.map((item)=>{
        return (
            <Field name={ item.name } type={ item.name } component={ renderField } label={ item.label } />
        )
    })
}


const Register = (props) => {
    const { handleSubmit, pristine, reset, submitting, register } = props
    return (
        <form className='admin-form' onSubmit={handleSubmit(register)}>
            { renderFields() }
            <div className="button-wrapper">
                <button type="submit" disabled={submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
            </div>
        </form>
    )
}


export default reduxForm({
    form: 'Register',
    validate
})(Register)