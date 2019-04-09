import React from 'react';
import PropTypes from 'prop-types';
import { filter } from 'ramda';
import { CircularProgress } from 'material-ui';

import withFirebase from '../../firebase/withFirebase';
import WordsList from './WordsList';

class ChapterWordsListContainer extends React.Component {
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
    const chapterIdLabel = window.location.pathname.split('/')[2];
    const isSelectedChapterWord = (word) => word.chapterId.startsWith(chapterIdLabel);

    return filter(isSelectedChapterWord, this.state.words);
  };

  renderLoader() {
    return (
      <div style={{ width: '100%', margin: 'auto', marginTop: '80px', textAlign: 'center' }}>
        <CircularProgress size={80} thickness={7} />
      </div>
    );
  }

  render() {
    const chapterIdLabel = window.location.pathname.split('/')[2];

    return (
      this.state.fetching ? this.renderLoader() : (
        <WordsList
          words={this.getWords()}
          translateLink={`/chapters/${chapterIdLabel}/words/translate`}
        />
      )
    );
  }
}

ChapterWordsListContainer.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default withFirebase(ChapterWordsListContainer);
