import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { sortBy, prop, pluck, merge, isEmpty } from 'ramda';
import { FormattedMessage } from 'react-intl';
import windowDimensions from 'react-window-dimensions';
import { Checkbox, RadioButtonGroup, RadioButton, RaisedButton, Paper } from 'material-ui';

import WordCard from './WordCard';
import { shuffleArray } from '../../util/ListUtil';
import TextToSpeech from '../../util/TextToSpeech';

const noWordsStyle = {
  height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'
};

class WordsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: this.sortWords(props.words, 'french'),
      sortBy: 'french',
      speechEnabled: false,
      openWords: new Set()
    };
    this.speech = new TextToSpeech();
  }

  componentDidMount() {
    if ('speechSynthesis' in window) {
      this.setState({ speechEnabled: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.words !== this.props.words) {
      this.setState((prevState) => ({
        words: this.sortWords(this.props.words, prevState.sortBy)
      }));
    }
  }

  cardsExpanded = () => {
    return this.state.openWords.size === this.state.words.length;
  };

  toggleExpandCards = () => {
    if (this.cardsExpanded()) {
      this.setState({ openWords: new Set() });
    } else {
      const wordIds = pluck('uid', this.state.words);
      this.setState({ openWords: new Set(wordIds) });
    }
  }

  addWordToOpenWords = (id) => {
    this.setState((prevState) => ({
      openWords: prevState.openWords.add(id)
    }));
  };

  removeWordFromOpenWords = (id) => {
    this.setState((prevState) => {
      const openWords = prevState.openWords;
      openWords.delete(id);
      return { openWords };
    });
  };

  sortByChange = (value) => {
    this.setState((prevState) => ({
      sortBy: value,
      words: this.sortWords(prevState.words, value)
    }));
  }

  sortWords = (words, sortProperty) => {
    if (sortProperty === 'random') {
      return shuffleArray(words);
    }
    if (sortProperty === 'french') {
      const predicate = ({ word, masculine }) => word || masculine;
      return sortBy(predicate, words);
    }
    if (sortProperty === 'english') {
      return sortBy(prop('translation'), words);
    }
    return words;
  }

  render() {
    if (isEmpty(this.props.words)) {
      return (
        <div className="wordsPage">
          <Paper style={noWordsStyle}>
            <FormattedMessage id="words.list.noWords" />
          </Paper>
        </div>
      );
    }

    const sortTextAlign = this.props.width > 993 ? { textAlign: 'right' } : {};
    return (
      <div className="wordsPage">
        <div className="row">
          <div className="col s9 m4 l4" style={{ marginTop: '20px' }}>
            <Checkbox
              label={<FormattedMessage id="words.list.expandCards" />}
              checked={this.cardsExpanded()}
              onCheck={this.toggleExpandCards}
            />
          </div>
          <div className="col s3 m2 l2" style={merge(sortTextAlign, { marginTop: '21px' })}>
            <FormattedMessage id="words.list.sortBy" />
          </div>
          <div className="col s12 m6 l6" style={{ marginTop: '20px' }}>
            <RadioButtonGroup
              name="wordAddInput"
              valueSelected={this.state.sortBy}
              style={{ display: 'flex' }}
              onChange={(e, value) => this.sortByChange(value)}
            >
              <RadioButton
                value="french"
                style={{ maxWidth: '33.3%' }}
                label={<FormattedMessage id="words.list.sortByFrench" />}
              />
              <RadioButton
                value="english"
                style={{ maxWidth: '33.3%' }}
                label={<FormattedMessage id="words.list.sortByEnglish" />}
              />
              <RadioButton
                value="random"
                style={{ maxWidth: '33.3%' }}
                label={<FormattedMessage id="words.list.sortByRandom" />}
              />
            </RadioButtonGroup>
          </div>
        </div>
        <div className="row wordsList">
          <div className="col s12 m12 l12">
            {this.state.words.map((word) => (
              <WordCard
                key={word.uid}
                word={word}
                speech={this.speech}
                speechEnabled={this.state.speechEnabled}
                expandCard={this.state.openWords.has(word.uid)}
                addWordToOpenWords={this.addWordToOpenWords}
                removeWordFromOpenWords={this.removeWordFromOpenWords}
              />
            ))}
          </div>
        </div>
        <div className="row">
          <div className="col s12 m12 l12" style={{ textAlign: 'right' }}>
            <Link to={this.props.translateLink}>
              <RaisedButton
                label={<FormattedMessage id="words.list.translate" />}
                primary
                className="translateButton"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

WordsList.propTypes = {
  width: PropTypes.number.isRequired,
  words: PropTypes.array.isRequired,
  translateLink: PropTypes.string.isRequired
};

export default windowDimensions()(WordsList);
