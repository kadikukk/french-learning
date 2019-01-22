import React, { Component } from 'react';
import { compose } from 'recompose';

import withAuthorization from '../session/withAuthorization';
import withFirebase from '../firebase/withFirebase';
import Messages from '../message/Messages.jsx';
import { FormattedMessage } from 'react-intl';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.setState({
        users: snapshot.val(),
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <div>
        <h1><FormattedMessage id="homePage.title"/></h1>
        <p>The Home Page is accessible by every signed in user.</p>

        <Messages users={this.state.users} />
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(HomePage);
