import React from 'react';
import SignupComponent from './SignupComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Header from './Header';

require('./App.css');

var mystyle = {
    margin: "0px",
    backgroundColor: "#F3F2F0"
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    name: '',
    email: '',
    country: '',
  };

  handleChange(event) {
    const field = event.target.name;
    this.setState({[field]: event.target.value});
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
