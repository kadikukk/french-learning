import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Drawer, AppBar as MaterialAppBar } from 'material-ui';
import { FormattedMessage, IntlProvider } from 'react-intl';

import withAuthentication from '../session/withAuthentication';
import ApplicationTheme from '../util/ApplicationTheme';

import HomePage from '../home/HomePage.jsx';
import SignUpPage from '../sign/SignUpPage.jsx';
import SignInPage from '../sign/SignInPage.jsx';
import PasswordForgetForm from '../password/PasswordForgetForm.jsx';
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
import AccountsTableContainer from '../account/AccountsTableContainer';
import PrivacyPolicy from './PrivacyPolicy.jsx';

import enTranslations from '../translate/en';
import etTranslations from '../translate/et';

const i18nConfig = {
  et: { messages: etTranslations },
  en: { messages: enTranslations }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false, language: 'en' };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuOpen: !prevState.menuOpen
    }));
  };

  changeLanguage = (lang) => {
    this.setState({ language: lang });
  };

  render() {
    return (
      <IntlProvider
        locale={this.state.language}
        messages={i18nConfig[this.state.language].messages}
      >
        <ApplicationTheme>
          <React.Fragment>
            <Router>
              <div>
                <AppBar
                  language={this.state.language}
                  toggleMenu={this.toggleMenu}
                  changeLanguage={this.changeLanguage}
                />
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
                <Route exact path="/" component={HomePage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/signin" component={SignInPage} />
                <Route path="/passwordForget" component={PasswordForgetForm} />
                <Route path="/account" component={PasswordChangeForm} />
                <Route path="/privacypolicy" component={PrivacyPolicy} />
                <Route path="/manage/accounts" component={AccountsTableContainer} />
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
        </ApplicationTheme>
      </IntlProvider>
    );
  }
}

export default withAuthentication(App);
