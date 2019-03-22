import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';

import WordTranslateCard from './WordTranslateCard';
import WordsTranslateLastPage from './WordsTranslateLastPage';

class WordsTranslate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordIndex: 0
    };
  }

  translateFromStart = () => {
    this.setState({ wordIndex: 0 });
  };

  handleClickNext = () => {
    this.setState((prevState) => ({
      wordIndex: prevState.wordIndex + 1
    }));
  }

  render() {
    if (isEmpty(this.props.words)) {
      return '';
    }
    if (this.state.wordIndex >= this.props.words.length) {
      return (
        <WordsTranslateLastPage translateFromStart={this.translateFromStart} />
      );
    }
    return (
      <WordTranslateCard
        word={this.props.words[this.state.wordIndex]}
        handleClickNext={this.handleClickNext}
      />
    );
  }
}

WordsTranslate.propTypes = {
  words: PropTypes.array.isRequired
};

export default WordsTranslate;
