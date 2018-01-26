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
            user: { email: null, registration: false, login: false }
        } 
    }
    componentWillMount(){
        const user = JSON.parse(localStorage.getItem("user"))
        this.setState({ user })
    }
    componentWillReceiveProps(nextProps) {
        const user = JSON.parse(localStorage.getItem("user"))
        const { auth } = nextProps;

        this.setState({
            emailVerified: nextProps.auth.emailVerified,
            error: nextProps.auth.error,
            user
        })

        if (auth.emailVerified) {
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
                        !this.state.emailVerified && this.state.user && !this.state.user.login ? 
                        
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
