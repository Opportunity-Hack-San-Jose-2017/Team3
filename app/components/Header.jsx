import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
//import NavigationClose from 'material-ui/NavigationClose';
require('./Header.css');
var mystyle = {
    margin: "0px",
    backgroundColor: "#252525"
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
  };

  render() {
    return (
    <AppBar style={mystyle} className="nav-bar"
      title="Give Light"
    />
    );
  }
}
