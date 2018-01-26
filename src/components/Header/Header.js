import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAccountToInitial } from '../../actions/auth'
import { NavLink } from 'react-router-dom';

class Header extends Component{

constructor(props){
    super(props)

    this.state = {
        user: {email: null, registration: false}
    }
}

componentWillMount(){
    const user = JSON.parse(localStorage.getItem("user"))

    this.setState({ user })
}
signOut = () => {

    this.props.createAccountToInitial()
}

componentWillReceiveProps(nextProps){
    const user = JSON.parse(localStorage.getItem("user"))
    this.setState({ user })
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
                        {auth.success || this.state.user && this.state.user.registration ?
                            <li><NavLink to="/" onClick={this.signOut}>Sign Out</NavLink></li>
                            : 
                            <li><NavLink to="/administration/register" activeClassName="selected">Create Account</NavLink></li>
                        }
                        <li><NavLink to="/administration/login" activeClassName="selected">Log In</NavLink></li>
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
export default connect(mapStateToProps, { createAccountToInitial })(Header);