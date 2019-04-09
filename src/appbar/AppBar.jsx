import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { AppBar as MaterialAppBar, FlatButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import windowDimensions from 'react-window-dimensions';

import AuthUserContext from '../session/AuthUserContext';
import withFirebase from '../firebase/withFirebase';

const TABLET_SCREEN_SIZE = 768;

class AppBar extends React.Component {
  handleSignOut = () => {
    this.props.firebase.signOut();
    this.props.history.push('/');
  };

  languageButton = () => {
    if (this.props.language === 'et') {
      return (
        <FlatButton
          label={<FormattedMessage id="appBar.en" />}
          style={{ marginTop: '15px', color: 'white', minWidth: 'none' }}
          onClick={() => this.props.changeLanguage('en')}
        />
      );
    }
    return (
      <FlatButton
        label={<FormattedMessage id="appBar.et" />}
        style={{ marginTop: '15px', color: 'white', minWidth: 'none' }}
        onClick={() => this.props.changeLanguage('et')}
      />
    );
  }

  signInOrOutButton = (authUser) => {
    if (authUser) {
      return (
        <FlatButton
          label={<FormattedMessage id="appBar.signOut" />}
          onClick={this.handleSignOut}
          style={{ marginTop: '15px', color: 'white' }}
        />
      );
    }
    return (
      <FlatButton
        label={<FormattedMessage id="appBar.signIn" />}
        onClick={() => this.props.history.push('/signin')}
        style={{ marginTop: '15px', color: 'white' }}
      />
    );
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <MaterialAppBar
            title={<FormattedMessage id="appBar.menu" />}
            onLeftIconButtonClick={this.props.toggleMenu}
          >
            {this.languageButton()}
            {this.props.width > TABLET_SCREEN_SIZE && this.signInOrOutButton(authUser)}
          </MaterialAppBar>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

AppBar.propTypes = {
  width: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired
};

export default windowDimensions()(
  compose(
    withFirebase,
    withRouter
  )(AppBar));

