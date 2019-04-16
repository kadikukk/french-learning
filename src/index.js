import React from 'react';
import ReactDOM from 'react-dom';
import etLocaleData from 'react-intl/locale-data/et';
import { addLocaleData } from 'react-intl';

import './index.css';
import 'react-tippy/dist/tippy.css';
import * as serviceWorker from './serviceWorker';

import App from './app/App.jsx';
import firebase from './firebase/Firebase';
import FirebaseContext from './firebase/FirebaseContext';

addLocaleData(etLocaleData);

ReactDOM.render(
  <FirebaseContext.Provider value={firebase}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('content'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
