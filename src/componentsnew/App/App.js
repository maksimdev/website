import React, { Component } from 'react';
import Dashboard from '../Dashboard/Dashboard';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Dashboard />
      </>
    );
  }
}
