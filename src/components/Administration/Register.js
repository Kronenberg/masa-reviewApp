import React, { Component } from 'react';
import Administration from './components/Administration';

const myAction = (e) => {
    console.log(e)
}


const Register = () => {

    return (
        <div>
            <h1>Registration</h1> 
            <Administration myAction={myAction}/>
        </div>
    )
}

export default Register