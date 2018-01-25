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
    console.log(props);
    const { handleSubmit, pristine, reset, submitting, myAction } = props
    return (
        <form onSubmit={handleSubmit(myAction)}>
            { renderFields() }
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}


export default reduxForm({
    form: 'Register',
    validate
})(Register)