import React from 'react';

import NavigationComponent from './navigation/NavigationComponent'

require('./App.css');


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <NavigationComponent />
    );
  }
}

