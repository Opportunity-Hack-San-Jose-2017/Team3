import React from 'react';

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
    console.log(event.target.name);
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
      <div>
      <form onSubmit={e => this.onSubmit(e)} className="MyForm">
        <div>Name: <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)} /></div>
        <div>Email: <input type="text" name="email" value={this.state.email} onChange={e => this.handleChange(e)} /></div>
        <div>Country: <input type="text" name="country" value={this.state.country}  onChange={e => this.handleChange(e)} /></div>
        <div><button type="submit">Save</button></div>
      </form>
      </div>
    );
  }
}
