import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux'
import App from './componentsnew/App/App';
import SignIn from './componentsnew/SignIn/SignIn';
import SignUp from './componentsnew/SignUp/SignUp';
//import './style.css';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Router>  
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
