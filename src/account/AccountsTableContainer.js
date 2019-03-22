import React from 'react';
import PropTypes from 'prop-types';
import { sortBy, compose, toLower, prop, find, propEq, append } from 'ramda';

import withFirebase from '../firebase/withFirebase';
import AccountsTable from './AccountsTable';

const sortByName = sortBy(compose(toLower, prop('name')));

class AccountsTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      fetching: false
    };
  }

  componentDidMount() {
    this.onListenForUsers();
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  getUser = (uid) => find(propEq('uid', uid), this.state.users);

  activateUser = (userUid) => {
    const user = this.getUser(userUid);
    this.props.firebase.user(userUid).set({
      ...user,
      active: true
    });
  };

  makeAdministrator = (userUid) => {
    const user = this.getUser(userUid);
    this.props.firebase.user(userUid).set({
      ...user,
      roles: append('ADMIN', user.roles)
    });
  };

  onListenForUsers() {
    this.setState({ fetching: true });
    this.props.firebase
      .users()
      .on('value', snapshot => {
        const usersObject = snapshot.val();

        if (usersObject) {
          const usersList = Object.keys(usersObject).map(key => {
            if (!usersObject[key].uid) {
              this.props.firebase.user(key).set({
                ...usersObject[key],
                uid: key
              });
            }
            return {
              ...usersObject[key],
              uid: key
            };
          });

          this.setState({
            users: sortByName(usersList),
            fetching: false
          });
        } else {
          this.setState({
            users: [],
            fetching: false
          });
        }
      });
  }

  render() {
    return (
      <AccountsTable
        fetching={this.state.fetching}
        users={this.state.users}
        activateUser={this.activateUser}
        makeAdministrator={this.makeAdministrator}
      />
    );
  }
}

AccountsTableContainer.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default withFirebase(AccountsTableContainer);
