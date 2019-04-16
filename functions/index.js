const functions = require('firebase-functions');

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
