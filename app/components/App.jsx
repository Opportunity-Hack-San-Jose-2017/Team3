import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

require('./App.css');

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

  onSubmit(e) {
    e.preventDefault();
    fetch('/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state),
    }).then(response => {
      return console.log(response);
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <form onSubmit={e => this.onSubmit(e)} className="MyForm">
          <div><TextField type="text" name="name" value={this.state.name} floatingLabelText="Name" onChange={e => this.handleChange(e)} /></div>
          <div><TextField type="text" name="email" value={this.state.email} floatingLabelText="Email" onChange={e => this.handleChange(e)} /></div>
          <div><TextField type="text" name="country" value={this.state.country} floatingLabelText="Country"  onChange={e => this.handleChange(e)} /></div>
          <div><RaisedButton type="submit" label="Save" /></div>
        </form>
      </MuiThemeProvider>
    );
  }
}
