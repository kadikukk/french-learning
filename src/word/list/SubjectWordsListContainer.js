import React from 'react';
import PropTypes from 'prop-types';
import { filter } from 'ramda';
import { CircularProgress } from 'material-ui';

import withFirebase from '../../firebase/withFirebase';
import WordsList from './WordsList';

class SubjectWordsListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      fetching: false
    };
  }

  componentDidMount() {
    this.onListenForWords();
  }

  componentWillUnmount() {
    this.props.firebase.words().off();
  }

  onListenForWords = () => {
    this.setState({ fetching: true });
    this.props.firebase
      .words()
      .on('value', (snapshot) => {
        const wordObject = snapshot.val();

        if (wordObject) {
          const wordList = Object.keys(wordObject).map(key => ({
            ...wordObject[key],
            uid: key
          }));

          this.setState({
            words: wordList,
            fetching: false
          });
        } else {
          this.setState({
            fetching: false
          });
        }
      });
  };

  getWords = () => {
    const pathnameParts = window.location.pathname.split('/');
    const chapterIdLabel = pathnameParts[2];
    const subjectIdLabel = pathnameParts[4];
    const isSelectedChapterAndSubjectWord = (word) => (
      word.chapterId.startsWith(chapterIdLabel) && word.subjectId.startsWith(subjectIdLabel)
    );
    return filter(isSelectedChapterAndSubjectWord, this.state.words);
  };

  renderLoader() {
    return (
      <div style={{ width: '100%', margin: 'auto', marginTop: '80px', textAlign: 'center' }}>
        <CircularProgress size={80} thickness={7} />
      </div>
    );
  }

  render() {
    const pathnameParts = window.location.pathname.split('/');
    const chapterIdLabel = pathnameParts[2];
    const subjectIdLabel = pathnameParts[4];
    const translateLink = `/chapters/${chapterIdLabel}/subjects/${subjectIdLabel}/words/translate`;

    return (
      this.state.fetching ? this.renderLoader() : (
        <WordsList
          words={this.getWords()}
          translateLink={translateLink}
        />
      )
    );
  }
}

SubjectWordsListContainer.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default withFirebase(SubjectWordsListContainer);
