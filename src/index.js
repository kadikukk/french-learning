import React from 'react';
import ReactDOM from 'react-dom';
import etLocaleData from 'react-intl/locale-data/et';
import { addLocaleData, IntlProvider } from 'react-intl';

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './app/App.jsx';
import Firebase from './firebase/Firebase';
import FirebaseContext from './firebase/FirebaseContext';
import enTranslations from './translate/en';
import etTranslations from './translate/et';

addLocaleData(etLocaleData);
const locale = 'en';

const i18nConfig = {
  et: { messages: etTranslations },
  en: { messages: enTranslations }
};

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <IntlProvider
      locale={locale}
      messages={i18nConfig[locale].messages}
    >
      <App />
    </IntlProvider>
  </FirebaseContext.Provider>,
  document.getElementById('content'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
