const functions = require('firebase-functions');

// This will run when a row is changed that matches this pattern
exports.onDeletedChapterRow = functions.database.ref('/chapters/{chapterId}')
  .onUpdate((event) => {
    // Exit if this item exists... if so it was not deleted!
    if (event.data.exists()) {
      return;
    }
    // Remove all subjects from that chapter
    event.data.adminRef.getRoot().ref('/subjects')
      .orderByChild('chapterId')
      .equalTo(event.params.chapterId)
      .on('value')
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          childSnapshot.remove();
        });
      });
  });
