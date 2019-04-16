import firebase from '../Firebase';

const deleteSubjectsByParent = (parent, parentValue) => {
  firebase.subjects()
    .orderByChild(parent)
    .equalTo(parentValue)
    .on('value', (snapshot) => {
      snapshot.forEach(childSnapshot => {
        firebase.subject(childSnapshot.key).remove();
      });
    });
};

const deleteWordsByParent = (parent, parentValue) => {
  firebase.words()
    .orderByChild(parent)
    .equalTo(parentValue)
    .on('value', (snapshot) => {
      snapshot.forEach(childSnapshot => {
        firebase.word(childSnapshot.key).remove();
      });
    });
};

export const deleteChapter = (chapterId) => {
  firebase.chapter(chapterId).remove()
    .then(() => {
      deleteSubjectsByParent('chapterId', chapterId);
      deleteWordsByParent('chapterId', chapterId);
    });
};

export const deleteSubject = (subjectId) => {
  firebase.subject(subjectId).remove()
    .then(() => {
      deleteWordsByParent('subjectId', subjectId);
    });
};
