import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAccountToInitial, verifyLogin } from '../../actions/auth'
import { NavLink } from 'react-router-dom';

import './Header.css'


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
            <header>
                <div>
                    <NavLink to="/" activeClassName="selected" className="logo">Logo</NavLink>
                </div>
                <div className='search-fild'>
                    <input></input>
                </div>
                <div className='login'>
                    <img className='avatar' 
                         src='https://vistanews.ru/uploads/posts/2017-04/medium/1492704380_02e99a1661c5bfa9d3ebecb16dafe34a_xl.jpg'
                         style={{display: this.state.login ? 'inline' : 'none'}} />               
                    <ul>
                        {
                            this.state.email && this.state.login ?
                            
                            <li><NavLink to="/" >{this.state.email}</NavLink></li>                          
                            :
                            <li><NavLink to="/administration/login" activeClassName="selected">Log In</NavLink></li>
                        }
                        {
                            auth.success || this.state.registration ?
                            
                            <li><NavLink to="/" onClick={this.signOut}>Sign Out</NavLink></li>
                            : 
                            <li><NavLink to="/administration/register" activeClassName="selected">Create Account</NavLink></li>
                        }
                    </ul>
                </div>
                <div className='chat'>
                    <NavLink to="/chat" activeClassName="selected">Chat</NavLink>
                </div>
            </header>    
        )
    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}
export default connect(mapStateToProps, { createAccountToInitial, verifyLogin })(Header);