import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header';
import SignupComponent from './SignupComponent';
import LoginComponent from './LoginComponent';
import ProfileComponent from './ProfileComponent';

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
        <BrowserRouter>
            <div>
              <Header />
              <Switch>
                <Route exact path='/' component={SignupComponent}/>
                <Route path='/signup' component={SignupComponent}/>
                <Route path='/login' component={LoginComponent}/>
                <Route path='/profile' component={ProfileComponent}/>
              </Switch>
            </div>
          </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

