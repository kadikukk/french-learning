import React from 'react';
import PropTypes from 'prop-types';
import { sortWith, prop, ascend } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Checkbox, RadioButtonGroup, RadioButton } from 'material-ui';

import WordCard from './WordCard';
import { shuffleArray } from '../../util/ListUtil';

class ChapterWordsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: props.words,
      expandCards: false,
      sortBy: 'word'
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.words !== this.props.words) {
      this.setState({
        words: this.props.words
      });
    }
  }

  toggleExpandCards = () => {
    this.setState((prevState) => {
      return {
        expandCards: !prevState.expandCards
      };
    });
  }

  sortByChange = (value) => {
    this.setState({
      sortBy: value
    });
  }

  sortWords = () => {
    if (this.state.sortBy === 'random') {
      return shuffleArray(this.state.words);
    }
    return sortWith([ascend(prop(this.state.sortBy))], this.state.words);
  }

  render() {
    return (
      <div className="wordsPage">
        <div className="row">
          <div className="col s12 m4 l4" style={{ marginTop: '20px' }}>
            <Checkbox
              label={<FormattedMessage id="words.list.expandCards" />}
              checked={this.state.expandCards}
              onCheck={this.toggleExpandCards}
            />
          </div>
          <div className="col s2 m2 l2" style={{ textAlign: 'right', marginTop: '21px' }}>
            <FormattedMessage id="words.list.sortBy" />
          </div>
          <div className="col s10 m6 l6" style={{ marginTop: '20px' }}>
            <RadioButtonGroup
              name="wordAddInput"
              valueSelected={this.state.sortBy}
              style={{ display: 'flex' }}
              onChange={(e, value) => this.sortByChange(value)}
            >
              <RadioButton
                value="word"
                label={<FormattedMessage id="words.list.sortByFrench" />}
              />
              <RadioButton
                value="translation"
                label={<FormattedMessage id="words.list.sortByEnglish" />}
              />
              <RadioButton
                value="random"
                label={<FormattedMessage id="words.list.sortByRandom" />}
              />
            </RadioButtonGroup>
          </div>
        </div>
        <div className="wordsList">
          {this.sortWords().map((word) => (
            <WordCard
              key={word.uid}
              word={word}
              expandCards={this.state.expandCards}
              toggleExpandCards={this.toggleExpandCards}
            />
          ))}
        </div>
      </div>
    );
  }
}

ChapterWordsList.propTypes = {
  words: PropTypes.array.isRequired
};

export default ChapterWordsList;
