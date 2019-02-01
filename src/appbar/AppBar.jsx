import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar as MaterialAppBar, FlatButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import AuthUserContext from '../session/AuthUserContext';
import withFirebase from '../firebase/withFirebase';

class AppBar extends React.Component {
  signInOrOutButton = () => {
    return (
      <AuthUserContext.Consumer>
        {authUser => authUser ? (
          <FlatButton
            label={<FormattedMessage id="appBar.signOut" />}
            onClick={this.props.firebase.doSignOut}
          />)
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
        iconElementRight={this.signInOrOutButton()}
      />
    );
  }
}

AppBar.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired
};

export default withFirebase(AppBar);

