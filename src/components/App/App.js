import React, { Component } from 'react';
import MiniDrawer from '../MiniDrawer/MiniDrawer';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MiniDrawer />
      </div>
    );
  }
}
