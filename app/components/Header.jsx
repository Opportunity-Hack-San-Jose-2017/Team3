import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import NavigationComponent from './NavigationComponent';

require('./Header.css');

const mystyle = {
    margin: "0px",
    backgroundColor: "#252525"
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
  };

  handleLogin(e) {
    window.location.href = "/login";
  }

  handleSignup(e) {
    window.location.href = "/signup";
  }

  render() {
    const rightButtons = (
      <div>
        <FlatButton label="Login" className="buttonStyle" onClick={(e) => this.handleLogin(e)} />
        <FlatButton label="Sign Up" className="buttonStyle" onClick={(e) => this.handleSignup(e)} />
      </div>
    );
    return (
    <AppBar
      style={mystyle}
      className="nav-bar"
      iconElementRight={rightButtons}
      title="Give Light"
    />
    );
  }
}
