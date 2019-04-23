import React from 'react';
import PropTypes from 'prop-types';
import { sortBy, compose, toLower, prop, find, propEq } from 'ramda';

import withFirebase from '../firebase/withFirebase';
import AccountsTable from './AccountsTable';

const sortByName = sortBy(compose(toLower, prop('name')));

class AccountsTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      registrations: [],
      fetching: false
    };
  }

  componentDidMount() {
    this.onListenForUsers();
    this.onListenForRegistrations();
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
    this.props.firebase.registrations().off();
  }

  getUser = (uid) => find(propEq('uid', uid), this.state.users);

  activateUser = (userUid) => {
    this.props.firebase
      .registration(userUid)
      .on('value', snapshot => {
        const registration = snapshot.val();

        if (registration) {
          this.props.firebase.registration(userUid).remove()
            .then(() => {
              this.props.firebase.user(userUid).set({
                name: registration.name,
                email: registration.email,
                isAdmin: false,
                active: true
              });
            });
        }
      });
  };

  makeAdministrator = (userUid) => {
    const user = this.getUser(userUid);
    this.props.firebase.user(userUid).set({
      ...user,
      isAdmin: true
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

  onListenForRegistrations() {
    this.setState({ fetching: true });
    this.props.firebase
      .registrations()
      .on('value', snapshot => {
        const registrationsObject = snapshot.val();

        if (registrationsObject) {
          const registrationsList = Object.keys(registrationsObject).map(key => {
            return {
              ...registrationsObject[key],
              uid: key
            };
          });

          this.setState({
            registrations: sortByName(registrationsList),
            fetching: false
          });
        } else {
          this.setState({
            registrations: [],
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
        registrations={this.state.registrations}
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
