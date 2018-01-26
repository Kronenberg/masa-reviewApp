import React, { Component } from 'react';
import Administration from './components/Administration';
import { connect } from 'react-redux';
import { createAccount } from '../../actions/auth';
import { withRouter } from 'react-router-dom';



class Register extends Component{
    constructor(props){
        super(props)

        this.state = {
            error: null
        }
    }

    createAccount = ({email, password}) => {
        const { createAccount } = this.props;
        
        createAccount(email, password)
        //loading .....

    
    }
    componentWillReceiveProps = (nextProps) => {
        const { auth, rejected } = nextProps;

        if (auth.success && !rejected) {
            this.props.history.push('/administration/login')
        } else if (auth.error) {
            this.setState({ error: auth.error })
        }
    }
    render(){
        const { error } = this.state;
        return (
            <div>
                <h1>Registration</h1> 
                <Administration register={this.createAccount}/>
                {error ? <p style={{color: 'red'}}>{error}</p> : null}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        auth: state.authReducer
    }
}

export default connect(mapStateToProps, { createAccount })(withRouter(Register))
