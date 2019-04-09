import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { sortWith, prop, ascend, pluck, merge } from 'ramda';
import { FormattedMessage } from 'react-intl';
import windowDimensions from 'react-window-dimensions';
import { Checkbox, RadioButtonGroup, RadioButton, RaisedButton } from 'material-ui';

import WordCard from './WordCard';
import { shuffleArray } from '../../util/ListUtil';
import TextToSpeech from '../../util/TextToSpeech';

class WordsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: props.words,
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
      this.setState({
        words: this.props.words
      });
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
    this.setState({
      sortBy: value
    });
  }

  sortWords = () => {
    if (this.state.sortBy === 'random') {
      return shuffleArray(this.state.words);
    }
    if (this.state.sortBy === 'french') {
      const property = (word) => word.word ? prop('word') : prop('masculine');
      return sortWith([ascend(property)], this.state.words);
    }
    if (this.state.sortBy === 'english') {
      return sortWith([ascend(prop('translate'))], this.state.words);
    }
    return this.state.words;
  }

  render() {
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
            {this.sortWords().map((word) => (
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
