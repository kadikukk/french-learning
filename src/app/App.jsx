import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Divider } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navigation from '../navigation/Navigation.jsx';
import LandingPage from '../landing/Landing.jsx';
import SignUpPage from '../sign/SignUpPage.jsx';
import SignInPage from '../sign/SignInPage.jsx';
import PasswordForgetPage from '../password/PasswordForgetPage.jsx';
import HomePage from '../home/HomePage.jsx';
import AccountPage from '../account/AccountPage.jsx';
import AdminPage from '../admin/AdminPage.jsx';

import withAuthentication from '../session/withAuthentication';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <Navigation />
        <Divider />
        <Route exact path={'/'} component={LandingPage} />
        <Route path={'/signup'} component={SignUpPage} />
        <Route path={'/signin'} component={SignInPage} />
        <Route
          path={'/pw-forget'}
          component={PasswordForgetPage}
        />
        <Route path={'/home'} component={HomePage} />
        <Route path={'/account'} component={AccountPage} />
        <Route path={'/admin'} component={AdminPage} />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default withAuthentication(App);
