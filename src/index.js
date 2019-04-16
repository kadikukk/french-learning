import React from 'react';
import ReactDOM from 'react-dom';
import etLocaleData from 'react-intl/locale-data/et';
import { addLocaleData } from 'react-intl';
import * as functions from 'firebase-functions';

import './index.css';
import 'react-tippy/dist/tippy.css';
import * as serviceWorker from './serviceWorker';

import App from './app/App.jsx';
import Firebase from './firebase/Firebase';
import FirebaseContext from './firebase/FirebaseContext';


// This will run when a row is changed that matches this pattern
exports.onDeletedRow = functions.database.ref('/chapters/{chapterId}')
  .onChange((event) => {
    // Exit if this item exists... if so it was not deleted!
    if (event.data.exists()) {
      return;
    }
    // Remove all posts from that user
    event.data.adminRef.getRoot().ref('/posts')
      .orderByChild('chapterId')
      .equalTo(event.params.chapterId)
      .on('value')
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          childSnapshot.remove();
        });
      });
  });


addLocaleData(etLocaleData);

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('content'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
