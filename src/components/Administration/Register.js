import React, { Component } from 'react';
import Administration from './components/Administration';
import { connect } from 'react-redux';
import { createAccount } from '../../actions/auth';



class Register extends Component{

    createAccount = ({email, password}) => {

        console.log(email, password)
        this.props.createAccount(email, password)
    }

    
    render(){
        return (
            <div>
                <h1>Registration</h1> 
                <Administration register={this.createAccount}/>
            </div>
        )
    }
}

export default connect(null, { createAccount })(Register)
