import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Drawer, AppBar as MaterialAppBar } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FormattedMessage } from 'react-intl';

import withAuthentication from '../session/withAuthentication';

import LandingPage from '../landing/Landing.jsx';
import SignUpPage from '../sign/SignUpPage.jsx';
import SignInPage from '../sign/SignInPage.jsx';
import PasswordForgetPage from '../password/PasswordForgetPage.jsx';
import AdminPage from '../admin/AdminPage.jsx';
import ChaptersContainer from '../chapter/ChaptersContainer.js';
import WordsAddFormContainer from '../word/add/form/WordsAddFormContainer.js';
import AppBar from '../appbar/AppBar.jsx';
import MenuContainer from '../menu/MenuContainer.js';
import SubjectsContainer from '../subject/SubjectsContainer.js';
import SubjectsAddFormContainer from '../subject/add/SubjectsAddFormContainer.js';
import SubjectWordsListContainer from '../word/list/SubjectWordsListContainer.js';
import ChapterWordsListContainer from '../word/list/ChapterWordsListContainer.js';
import WordsTranslateContainer from '../word/translate/WordsTranslateContainer';
import PasswordChangeForm from '../password/PasswordChangeForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuOpen: !prevState.menuOpen
    }));
  };

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Router>
            <div>
              <AppBar toggleMenu={this.toggleMenu} />
              <Drawer
                open={this.state.menuOpen}
                docked={false}
                onRequestChange={this.toggleMenu}
              >
                <MaterialAppBar
                  title={<FormattedMessage id="appBar.menu" />}
                  showMenuIconButton={false}
                />
                <MenuContainer toggleMenu={this.toggleMenu} />
              </Drawer>
              <Route exact path="/" component={LandingPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/signin" component={SignInPage} />
              <Route path="/pw-forget" component={PasswordForgetPage} />
              <Route path="/account" component={PasswordChangeForm} />
              <Route path="/admin" component={AdminPage} />
              <Route path="/chapters/:id/subjects" exact component={SubjectsContainer} />
              <Route path="/chapters/:id/words" exact component={ChapterWordsListContainer} />
              <Route path="/chapters/:id/words/translate" component={WordsTranslateContainer} />
              <Route path="/chapters/:id/subjects/:id/words" exact component={SubjectWordsListContainer} />
              <Route path="/chapters/:id/subjects/:id/words/translate" component={WordsTranslateContainer} />
              <Route path="/manage/chapters" component={ChaptersContainer} />
              <Route path="/manage/subjects" component={SubjectsAddFormContainer} />
              <Route path="/manage/words" component={WordsAddFormContainer} />
            </div>
          </Router>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default withAuthentication(App);
