import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAllGroups, sendMessage, WhoIsTypingSetUser } from '../../actions/senders';

class Chat extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      email: '',
      password: '',
      currentUser: '',
      test: 'asd'
    }
  }

  // scrollToBottom = () => {
  //   const scrollHeight = this.overFlowArea.scrollHeight;
  //   const height = this.overFlowArea.clientHeight;
  //   const maxScrollTop = scrollHeight - height;
  //   this.overFlowArea.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  // }

  componentWillMount() {
    this.props.getAllGroups();
  }

  // componentDidUpdate() {
  //   this.scrollToBottom();
  // }

  sendMessage = (e) => {
    e.preventDefault();
    if (!localStorage.getItem('userName') && this.state.message.length < 0) {
      console.log('please log in');
    } else {
      this.props.sendMessage(this.state.message, this.state.accountColor);
      this.setState({ message: '' });
      this.overFlowArea.scrollTo(0, this.overFlowArea.scrollHeight);
    }

  }

  getMessage = (e) => {

    this.setState({ message: e.target.value });

    this.props.WhoIsTypingSetUser(this.state.message);

  }

  createAccount = () => {

    this.props.createAccount(this.state.email, '12312312');
  }

  createNameForAccount = (e) => {
    this.setState({ email: e.target.value });
  }

  showCurrentUser = () => {

  }

  generateRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    this.setState({ accountColor: color });
    console.log(this.state.accountColor);


  }


  render() {
    // this.overFlowArea.scrollTo(0, this.overFlowArea.scrollHeight);
    // console.log(this.props.groupStatus ? this.props.groupStatus.groups : []);
    const messages = this.props.groupStatus ? this.props.groupStatus.groups
      // .reverse()
      .map(m => (
        <p key={m.key} className="message">
          <div
            style={{ background: m.accountColor ? m.accountColor : 'grey' }}
            className="avatar">
            {m.name}
          </div>
          <span
            style={{ color: m.accountColor ? '#444' : '#444' }}
            className="name">{m.name} <em style={{ color: "#a0a0a0" }}>{m.wasCreated ? new Date(m.wasCreated).getHours() + ":" + new Date(m.wasCreated).getMinutes() : ''}</em>
          </span>
          <br />
          <span className="m"> {m.message}</span>
        </p>
      )) : [];
    return (
      <div className="mainContainer">
        <div className="flex-container">
          <div
            className="accountListGlobal"
            style={{ width: 220 }}>

          </div>
          <div
            className="chatGlobal"
            style={{ flexGrow: 14 }}>
            <div ref={(elem) => { this.overFlowArea = elem; }} className="chatWindow item">
              <div >
                {this.props.groupStatus.pending ? <img style={{ width: '100%', height: '100%' }} src="https://media.giphy.com/media/CdhxVrdRN4YFi/giphy.gif" /> : messages}
              </div>
            </div>
            <form onSubmit={this.sendMessage}>
              {/* <div style={{ margin: 10 }} className={this.props.whoIsTypingStatus.pending ? "hide" : ""}>{this.props.whoIsTyping && this.props.whoIsTyping.user ? this.props.whoIsTyping.user : ''} typing...</div> */}
              <input
                placeholder="Message: "
                className="inputAreaMain"
                value={this.state.message}
                onChange={this.getMessage} />
            </form>
          </div>
          <div
            className="rightSideGlobal"
            style={{ flexGrow: 1, width: 50 }}
          ></div>
        </div>
        <div className="globalConteiner">
          <div
            className="">
            <div>
              <div>Welcome to next level chat Room ULTRA 2.0</div>
              <div className="registration" style={{ padding: '20px' }}>
                <div className="form">
                  <input onChange={this.createNameForAccount} placeholder="Type your email address: " />
                  <button onClick={this.createAccount}>CREATE ACCOUNT</button>
                </div>

                <div style={{ color: 'green' }}>{this.props.auth.pending ? 'Loading...' : ''}</div>
                <div style={{ color: 'green' }}>{this.props.auth.success ? 'Account was created!!!!!' : ''}</div>
                <div style={{ color: 'red' }}>{this.props.auth.rejected ? 'Error on server' : ''}</div>
              </div>
              <div className="typing"><p>{!localStorage.getItem('userName') ? 'You are not loged in' : "Welcome to ULTRA 2.0 " + localStorage.getItem('userName')}</p></div>
              <button className="generateColorBtn" style={{ textShadow: this.state.accountColor }} onClick={this.generateRandomColor}>GENERATE RANDOM COLOR TO YOUR MESSAGE</button>

            </div>
          </div>

        </div>



      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    groupStatus: state.groupReducer,
   auth: state.authReducer,
    //whoIsTyping: state.whoIsTypignReducer.getUser,
    whoIsTypingStatus: state.whoIsTypignReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   getAllGroups: bindActionCreators(getAllGroups, dispatch),
    sendMessage: bindActionCreators(sendMessage, dispatch),
   // createAccount: bindActionCreators(createAccount, dispatch),
    WhoIsTypingSetUser: bindActionCreators(WhoIsTypingSetUser, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Chat);
