import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Drawer } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Menu from '../menu/Menu.jsx';
import LandingPage from '../landing/Landing.jsx';
import SignUpPage from '../sign/SignUpPage.jsx';
import SignInPage from '../sign/SignInPage.jsx';
import PasswordForgetPage from '../password/PasswordForgetPage.jsx';
import HomePage from '../home/HomePage.jsx';
import AccountPage from '../account/AccountPage.jsx';
import AdminPage from '../admin/AdminPage.jsx';
import ChaptersContainer from '../chapter/ChaptersContainer.js';

import withAuthentication from '../session/withAuthentication';
import AppBar from '../appbar/AppBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuOpen: !prevState.menuOpen
    }));
  };

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Router>
            <div>
              <AppBar toggleMenu={this.toggleMenu} />
              <Drawer
                open={this.state.menuOpen}
                docked={false}
                onRequestChange={this.toggleMenu}
              >
                <Menu toggleMenu={this.toggleMenu} />
              </Drawer>
              <Route exact path={'/'} component={LandingPage} />
              <Route path={'/signup'} component={SignUpPage} />
              <Route path={'/signin'} component={SignInPage} />
              <Route path={'/pw-forget'} component={PasswordForgetPage} />
              <Route path={'/home'} component={HomePage} />
              <Route path={'/account'} component={AccountPage} />
              <Route path={'/admin'} component={AdminPage} />
              <Route path={'/chapters'} component={ChaptersContainer} />
            </div>
          </Router>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default withAuthentication(App);
