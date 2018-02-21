import React, { Component } from 'react';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div className='admin-fields'>
            <input {...input} placeholder={label} type={type} />
            {touched && ((error && <p className='error-messages'>{error}</p>) || (warning && <p>{warning}</p>))}
        </div>
    </div>
)

export default renderField;
