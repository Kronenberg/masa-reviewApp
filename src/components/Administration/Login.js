import React, { Component } from 'react';
import Administration from './components/Administration';
import { connect } from 'react-redux';
import { loginViaFirebase } from '../../actions/auth';



class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailVerified: false
        } 
    }
    
    componentWillReceiveProps(nextProps) {
        console.log(nextProps, "fvrvrgvrvrvbr");
        this.setState({
            emailVerified: nextProps.user.emailVerified

        })
    }
    
    loginViaFirebase = ({ email, password }) => {
        this.props.loginViaFirebase(email, password)
    }

    


    render() {
        return (

            <div>
                <h1>Login</h1>
                <Administration register={this.loginViaFirebase} />
                {this.state.emailVerified ? null : <h1>Check email</h1>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer
    }
} 

export default connect(mapStateToProps, { loginViaFirebase })(Login)
