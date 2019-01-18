import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import withAuthorization from '../session/withAuthorization';
import UserList from '../user/UserList.jsx';
import UserItem from '../user/UserItem.jsx';

const ROLES = { ADMIN: 'ADMIN' };

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    <Switch>
      <Route exact path={'/admin/:id'} component={UserItem} />
      <Route exact path={'/admin'} component={UserList} />
    </Switch>
  </div>
);

const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withAuthorization(condition),
)(AdminPage);
