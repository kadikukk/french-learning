import React from 'react';
import { compose } from 'recompose';

import AuthUserContext from '../session/AuthUserContext';
import withAuthorization from '../session/withAuthorization';
import { PasswordForgetForm } from '../password/PasswordForgetPage.jsx';
import PasswordChangeForm from '../password/PasswordChangeForm.jsx';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(AccountPage);
