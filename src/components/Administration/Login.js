import React, { Component } from 'react';
import Administration from './components/Administration';
import { connect } from 'react-redux';
import { loginViaFirebase } from '../../actions/auth';
import { withRouter } from 'react-router-dom';



class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailVerified: false,
            register: false
        } 
    }
    
    componentWillReceiveProps(nextProps) {

        const { auth } = nextProps;

        this.setState({
            emailVerified: auth.emailVerified,
            error: auth.error,
            register: auth.success
        })

        if (!auth.error && auth.emailVerified) {
            this.props.history.push('/')
        } else if (auth.error) {
            this.setState({ error: auth.error })
        }
    }
    
    loginViaFirebase = ({ email, password }) => {
        this.props.loginViaFirebase(email, password)
    }

    render() {
        return (

            <div>
                <h1>Login</h1>
                <Administration register={this.loginViaFirebase} />
                {   
                    this.state.error ? 
                        
                        <p style={{color: 'red'}}>{this.state.error}</p> :
                        !this.state.emailVerified && this.state.register ? 
                        
                        <p>Verify your email address</p> : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
} 

export default connect(mapStateToProps, { loginViaFirebase })(withRouter(Login))
