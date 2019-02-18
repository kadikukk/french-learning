import React from 'react';
import PropTypes from 'prop-types';
import { sortBy, compose, toLower, prop } from 'ramda';

import withFirebase from '../../../firebase/withFirebase';
import WordsAddForm from './WordsAddForm';

const sortByName = sortBy(compose(toLower, prop('name')));

class WordsAddFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: [],
      subjects: [],
      words: [],
      fetching: false
    };
  }

  componentDidMount() {
    this.onListenForChapters();
    this.onListenForSubjects();
    this.onListenForWords();
  }

  componentWillUnmount() {
    this.props.firebase.chapters().off();
    this.props.firebase.subjects().off();
    this.props.firebase.words().off();
  }

  onListenForChapters = () => {
    this.setState({ fetching: true });
    this.props.firebase
      .chapters()
      .on('value', (snapshot) => {
        const chapterObject = snapshot.val();

        if (chapterObject) {
          const chapterList = Object.keys(chapterObject).map(key => ({
            ...chapterObject[key],
            uid: key
          }));

          this.setState({
            chapters: sortByName(chapterList),
            fetching: false
          });
        } else {
          this.setState({
            fetching: false
          });
        }
      });
  };

  onListenForSubjects = () => {
    this.setState({ fetching: true });
    this.props.firebase
      .subjects()
      .on('value', (snapshot) => {
        const subjectObject = snapshot.val();

        if (subjectObject) {
          const subjectList = Object.keys(subjectObject).map(key => ({
            ...subjectObject[key],
            uid: key
          }));

          this.setState({
            subjects: sortByName(subjectList),
            fetching: false
          });
        } else {
          this.setState({
            fetching: false
          });
        }
      });
  };

  onListenForWords = () => {
    this.props.firebase
      .words()
      .on('value', (snapshot) => {
        const wordObject = snapshot.val();

        if (wordObject) {
          const wordList = Object.keys(wordObject).map(key => {
            // add uid to word
            if (!wordObject[key].uid) {
              this.props.firebase.word(key).set({
                ...wordObject[key],
                uid: key
              });
            }
            return {
              ...wordObject[key],
              uid: key
            };
          });

          this.setState({
            words: wordList
          });
        }
      });
  };

  render() {
    return (
      <WordsAddForm
        fetching={this.state.fetching}
        chapters={this.state.chapters}
        subjects={this.state.subjects}
        words={this.state.words}
      />
    );
  }
}

WordsAddFormContainer.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default withFirebase(WordsAddFormContainer);
