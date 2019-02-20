import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, ListItem, CircularProgress } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import AuthUserContext from '../session/AuthUserContext';
import { idLabel } from '../util/IdLabel';

import './Menu.css';

const ROLES = { ADMIN: 'ADMIN' };

const Loader = () => (
  <div style={{ width: '100%', margin: 'auto', textAlign: 'center' }}>
    <CircularProgress />
  </div>
);

const ChaptersList = ({ chapters, toggleMenu }) => (
  chapters.map((chapter) => (
    <ListItem
      key={chapter.uid}
      primaryText={chapter.name}
      nestedListStyle={{ marginLeft: '20px' }}
      primaryTogglesNestedList
      nestedItems={[
        <Link key={chapter.uid + 1} to={`/chapters/${idLabel(chapter.uid)}/subjects`}>
          <ListItem
            primaryText={<FormattedMessage id="menu.chapter.subjects" />}
            onClick={toggleMenu}
          />
        </Link>,
        <Link key={chapter.uid + 2} to={`/chapters/${idLabel(chapter.uid)}/words`}>
          <ListItem
            primaryText={<FormattedMessage id="menu.chapter.words" />}
            onClick={toggleMenu}
          />
        </Link>
      ]}
    />
  ))
);


const MenuNonAuth = ({ toggleMenu, chapters, fetching }) => (
  <List>
    <Link to={'/'}>
      <ListItem primaryText="Landing" onClick={toggleMenu} />
    </Link>
    {fetching ? <Loader /> : (
      <ChaptersList chapters={chapters} toggleMenu={toggleMenu} />
    )}
  </List>
);

MenuNonAuth.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  chapters: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired
};


const MenuAuth = ({ authUser, toggleMenu, chapters, fetching }) => (
  <List>
    <Link to={'/'}>
      <ListItem primaryText="Landing" onClick={toggleMenu} />
    </Link>
    <Link to={'/account'}>
      <ListItem primaryText="Account" onClick={toggleMenu} />
    </Link>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <Link to={'/admin'}>
        <ListItem primaryText="Admin" onClick={toggleMenu} />
      </Link>
    )}
    <Link to={'/manage/chapters'}>
      <ListItem primaryText={<FormattedMessage id="menu.chapters" />} onClick={toggleMenu} />
    </Link>
    <Link to={'/manage/subjects'}>
      <ListItem primaryText={<FormattedMessage id="menu.subjects" />} onClick={toggleMenu} />
    </Link>
    <Link to={'/manage/words'}>
      <ListItem primaryText={<FormattedMessage id="menu.words" />} onClick={toggleMenu} />
    </Link>
    {fetching ? <Loader /> : (
      <ChaptersList chapters={chapters} toggleMenu={toggleMenu} />
    )}
  </List>
);

MenuAuth.propTypes = {
  authUser: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  chapters: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired
};


const Menu = ({ toggleMenu, chapters, fetching }) => (
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <MenuAuth chapters={chapters} fetching={fetching} authUser={authUser} toggleMenu={toggleMenu} />
      : <MenuNonAuth chapters={chapters} fetching={fetching} toggleMenu={toggleMenu} />
    }
  </AuthUserContext.Consumer>
);

Menu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  chapters: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired
};

export default Menu;
