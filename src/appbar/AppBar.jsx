import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar as MaterialAppBar, FlatButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import windowDimensions from 'react-window-dimensions';

import AuthUserContext from '../session/AuthUserContext';
import withFirebase from '../firebase/withFirebase';

const TABLET_SCREEN_SIZE = 768;

class AppBar extends React.Component {
  signInOrOutButton = () => {
    return (
      <AuthUserContext.Consumer>
        {authUser => authUser ? (
          <Link to="/">
            <FlatButton
              label={<FormattedMessage id="appBar.signOut" />}
              onClick={this.props.firebase.doSignOut}
            />
          </Link>)
          : (
            <Link to="/signin">
              <FlatButton
                label={<FormattedMessage id="appBar.signIn" />}
              />
            </Link>)}
      </AuthUserContext.Consumer>
    );
  };

  render() {
    return (
      <MaterialAppBar
        title={<FormattedMessage id="appBar.menu" />}
        onLeftIconButtonClick={this.props.toggleMenu}
        iconElementRight={this.props.width > TABLET_SCREEN_SIZE ? this.signInOrOutButton() : null}
      />
    );
  }
}

AppBar.propTypes = {
  width: PropTypes.number.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired
};

export default windowDimensions()(withFirebase(AppBar));

