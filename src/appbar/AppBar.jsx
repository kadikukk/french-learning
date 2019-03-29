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

  signInOrOutButton = (authUser) => {
    if (authUser) {
      return (
        <FlatButton
          label={<FormattedMessage id="appBar.signOut" />}
          onClick={this.handleSignOut}
        />
      );
    }
    return (
      <FlatButton
        label={<FormattedMessage id="appBar.signIn" />}
        onClick={() => this.props.history.push('/signin')}
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
            iconElementRight={this.props.width > TABLET_SCREEN_SIZE ? this.signInOrOutButton(authUser) : null}
          />
        )}
      </AuthUserContext.Consumer>
    );
  }
}

AppBar.propTypes = {
  width: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired
};

export default windowDimensions()(
  compose(
    withFirebase,
    withRouter
  )(AppBar));

