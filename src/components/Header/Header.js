import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAccountToInitial, verifyLogin } from '../../actions/auth'
import { NavLink } from 'react-router-dom';


class Header extends Component{

constructor(props){
    super(props)

    this.state = {
       email: null, 
       registration: false, 
       login: false
    }
}

componentWillMount(){
    //const user = JSON.parse(localStorage.getItem("user"))
   
    //this.setState({ user })
    this.props.verifyLogin(JSON.parse(localStorage.getItem("userToken")));
}
signOut = () => {

    this.props.createAccountToInitial()
}

componentWillReceiveProps(nextProps){
     console.log(nextProps)
     const { auth } = nextProps

    this.setState({ email: auth.userEmail, registration: auth.success, login: auth.login })
}
render(){
    const { auth } = this.props;
    return (
            <nav>
                <div>
                    <ul>
                        <li><NavLink to="/" activeClassName="selected" className="logo">Logo</NavLink></li>
                        <li><NavLink to="/" activeClassName="selected">Programs</NavLink></li>
                        <li><NavLink to="/chat" activeClassName="selected">Chat</NavLink></li>
                    </ul>
                </div>
                <div>
                    <ul>
                        {
                            auth.success || this.state.registration ?
                            
                            <li><NavLink to="/" onClick={this.signOut}>Sign Out</NavLink></li>
                            : 
                            <li><NavLink to="/administration/register" activeClassName="selected">Create Account</NavLink></li>
                        }
                        {
                            this.state.email && this.state.login ?
                            
                            <li><NavLink to="/" >{this.state.email}</NavLink></li>                          
                            :
                            <li><NavLink to="/administration/login" activeClassName="selected">Log In</NavLink></li>
                        }
                    </ul>
                </div>
            </nav>    
        )
    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}
export default connect(mapStateToProps, { createAccountToInitial, verifyLogin })(Header);