import React, { Component } from 'react';
import Administration from './components/Administration';

const myAction = (e) => {
    console.log(e)
}


const Login = () => {

    return (
        <div>
            <h1>Login</h1>
            <Administration myAction={myAction} />
        </div>
    )
}

export default Login