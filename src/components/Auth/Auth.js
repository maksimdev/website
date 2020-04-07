import React from 'react';
import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';

import SignIn from './../SignIn/SignIn';
import SignUp from './../SignUp/SignUp';
import Main from '../Main/Main';
import Dashboard from '../Dashboard/Dashboard';
import Budget from '../../componentsOld/Budget/Budget';
import BillsContainer from '../../containers/BillsContainer/BillsContainer';

function PublicPage() {
  return <h3>Public</h3>;
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated
});

function Auth({ history, isAuthenticated, cookies }) {

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            <Main>
              {children}
            </Main>
          ) : (
            <Redirect
              to={{
                pathname: "/signIn",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  };

  function LoginRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: { from: location }
              }}
            />
          ) : (
            children
          )
        }
      />
    );
  }

  return (
    <Router history={history}>
      <Switch>
        <Route path="/public">
          <PublicPage />
        </Route>
        <LoginRoute path="/signIn">
          <SignIn />
        </LoginRoute>
        <LoginRoute path="/signUp">
          <SignUp />
        </LoginRoute>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/budget">
          <Budget />
        </PrivateRoute>
        <PrivateRoute path="/bill">
          <BillsContainer />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default connect(mapStateToProps)(Auth);