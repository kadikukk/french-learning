import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import AuthUserContext from '../session/AuthUserContext';
import './Menu.css';

const ROLES = { ADMIN: 'ADMIN' };


const MenuNonAuth = ({ toggleMenu }) => (
  <List>
    <Link to={'/'}>
      <ListItem primaryText="Landing" onClick={toggleMenu} />
    </Link>
  </List>
);

MenuNonAuth.propTypes = {
  toggleMenu: PropTypes.func.isRequired
};


const MenuAuth = ({ authUser, toggleMenu }) => (
  <List>
    <Link to={'/'}>
      <ListItem primaryText="Landing" onClick={toggleMenu} />
    </Link>
    <Link to={'/home'}>
      <ListItem primaryText="Home" onClick={toggleMenu} />
    </Link>
    <Link to={'/account'}>
      <ListItem primaryText="Account" onClick={toggleMenu} />
    </Link>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <Link to={'/admin'}>
        <ListItem primaryText="Admin" onClick={toggleMenu} />
      </Link>
    )}
    <Link to={'/chapters'}>
      <ListItem primaryText={<FormattedMessage id="menu.chapters"/>} onClick={toggleMenu} />
    </Link>
  </List>
);

MenuAuth.propTypes = {
  authUser: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired
};


const Menu = ({ toggleMenu }) => (
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <MenuAuth authUser={authUser} toggleMenu={toggleMenu} />
      : <MenuNonAuth toggleMenu={toggleMenu} />
    }
  </AuthUserContext.Consumer>
);

Menu.propTypes = {
  toggleMenu: PropTypes.func.isRequired
};

export default Menu;
