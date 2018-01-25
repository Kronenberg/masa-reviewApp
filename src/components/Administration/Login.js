import React, { Component } from 'react';
import Administration from './components/Administration';
import { connect } from 'react-redux';
import { loginViaFirebase } from '../../actions/auth';



class Register extends Component {

    loginViaFirebase = ({ email, password }) => {
        this.props.loginViaFirebase(email, password)
    }

    render() {
        return (

            <div>
                <h1>Login</h1>
                <Administration register={this.loginViaFirebase} />
            </div>
        )
    }
}

export default connect(null, { loginViaFirebase })(Register)
