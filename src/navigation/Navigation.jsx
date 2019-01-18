import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from '../session/AuthUserContext';
import SignOutButton from '../sign/SignOutButton.jsx';

const ROLES = { ADMIN: 'ADMIN' };

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={'/'}>Landing</Link>
    </li>
    <li>
      <Link to={'/home'}>Home</Link>
    </li>
    <li>
      <Link to={'/account'}>Account</Link>
    </li>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <li>
        <Link to={'/admin'}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={'/'}>Landing</Link>
    </li>
    <li>
      <Link to={'/signin'}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
