import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { List, ListItem, CircularProgress } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import AuthUserContext from '../session/AuthUserContext';
import { idLabel } from '../util/IdLabel';

import './Menu.css';
import { isActiveUser } from '../util/AuthUtil';

const Loader = () => (
  <div style={{ width: '100%', margin: 'auto', textAlign: 'center' }}>
    <CircularProgress />
  </div>
);


const handleChapterItemClick = (toggleMenu, history, linkTo) => {
  history.push(linkTo);
  toggleMenu();
};

const ChaptersList = ({ chapters, toggleMenu, history }) => (
  chapters.map((chapter) => (
    <ListItem
      key={chapter.uid}
      primaryText={chapter.name}
      nestedListStyle={{ marginLeft: '20px' }}
      primaryTogglesNestedList
      nestedItems={[
        <ListItem
          key={chapter.uid + 1}
          primaryText={<FormattedMessage id="menu.chapter.subjects" />}
          onClick={() => handleChapterItemClick(toggleMenu, history, `/chapters/${idLabel(chapter.uid)}/subjects`)}
        />,
        <ListItem
          key={chapter.uid + 2}
          primaryText={<FormattedMessage id="menu.chapter.words" />}
          onClick={() => handleChapterItemClick(toggleMenu, history, `/chapters/${idLabel(chapter.uid)}/words`)}
        />
      ]}
    />
  ))
);


const MenuNonAuth = ({ toggleMenu, chapters, fetching, history }) => (
  <List>
    <Link to={'/'}>
      <ListItem primaryText={<FormattedMessage id="menu.home" />} onClick={toggleMenu} />
    </Link>
    {fetching ? <Loader /> : (
      <ChaptersList chapters={chapters} toggleMenu={toggleMenu} history={history} />
    )}
  </List>
);

MenuNonAuth.propTypes = {
  history: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  chapters: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired
};


const MenuAuth = ({ authUser, toggleMenu, chapters, fetching, history }) => (
  <List>
    <Link to={'/'}>
      <ListItem primaryText={<FormattedMessage id="menu.home" />} onClick={toggleMenu} />
    </Link>
    <Link to={'/account'}>
      <ListItem primaryText={<FormattedMessage id="menu.account" />} onClick={toggleMenu} />
    </Link>
    {authUser.isAdmin && (
      <Link to={'/manage/accounts'}>
        <ListItem primaryText={<FormattedMessage id="menu.manageAccounts" />} onClick={toggleMenu} />
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
      <ChaptersList chapters={chapters} toggleMenu={toggleMenu} history={history} />
    )}
  </List>
);

MenuAuth.propTypes = {
  history: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  chapters: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired
};


const Menu = ({ toggleMenu, chapters, fetching, history }) => (
  <AuthUserContext.Consumer>
    {authUser => isActiveUser(authUser)
      ? <MenuAuth chapters={chapters} fetching={fetching} authUser={authUser} toggleMenu={toggleMenu} history={history} />
      : <MenuNonAuth chapters={chapters} fetching={fetching} toggleMenu={toggleMenu} history={history} />
    }
  </AuthUserContext.Consumer>
);

Menu.propTypes = {
  history: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  chapters: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired
};

export default withRouter(Menu);
