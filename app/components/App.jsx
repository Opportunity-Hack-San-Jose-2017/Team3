import React from 'react';
import SignupComponent from './SignupComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Header from './Header';
import NavigationBarComponent from './NavigationComponent'

require('./App.css');

var mystyle = {
    margin: "0px",
    backgroundColor: "#F3F2F0"
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
          <div>
              <Header />
              <SignupComponent />
          </div>
      </MuiThemeProvider>
    );
  }
}
