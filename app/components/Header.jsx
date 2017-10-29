import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
//import NavigationClose from 'material-ui/NavigationClose';

//require('./Header.css');

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
  };

  render() {
    return (
    <AppBar
      title="Give Light"
    />
    );
  }
}
