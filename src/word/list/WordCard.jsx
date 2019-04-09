import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, Divider, IconButton } from 'material-ui';
import ListenWordIcon from 'material-ui/svg-icons/av/volume-up';
import { grey600 } from 'material-ui/styles/colors';

import {
  FrenchWord, Type, Translation, Plural, Gender,
  Preposition, Postposition, VerbGroup, AdditionalInfo
} from './WordCardContent';

import './WordCard.css';

const styles = {
  speechButton: { padding: '0px', width: '24px', height: '24px', marginLeft: '5px' },
  speechButtonIcon: { color: grey600 }
};

class WordCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandCard: props.expandCard
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expandCard !== this.props.expandCard) {
      this.setState((prevState) => ({
        expandCard: prevState.expanded || this.props.expandCard
      }));
    }
  }

  listenWord = (e, word) => {
    e.stopPropagation();

    this.props.speech.speak(word);
  };

  toggleExpandCard = (expanded) => {
    if (expanded) {
      this.props.addWordToOpenWords(this.props.word.uid);
    } else {
      this.props.removeWordFromOpenWords(this.props.word.uid);
    }
    this.setState({ expandCard: expanded });
  }

  headerTitle = () => {
    const frenchWord = this.props.word.word || this.props.word.masculine + '/' + this.props.word.feminine;
    return (
      <div style={{ display: 'flex', alignItems: 'end' }}>
        {frenchWord}
        {this.props.speechEnabled && (
          <IconButton
            style={styles.speechButton}
            iconStyle={styles.speechButtonIcon}
            onClick={(e) => this.listenWord(e, frenchWord)}
          >
            <ListenWordIcon />
          </IconButton>
        )}
      </div>
    );
  };

  render() {
    return (
      <Card
        expanded={this.state.expandCard}
        style={{ marginTop: '10px' }}
        onExpandChange={this.toggleExpandCard}
      >
        <CardHeader
          style={{ paddingLeft: '26px' }}
          titleStyle={{ fontSize: '16px' }}
          title={this.headerTitle()}
          actAsExpander
          showExpandableButton
        />
        <Divider />
        <CardText expandable style={{ padding: '0px' }}>
          <Type word={this.props.word} />
          <FrenchWord word={this.props.word} />
          <Plural word={this.props.word} />
          <Gender word={this.props.word} />
          <Translation word={this.props.word} />
          <Preposition word={this.props.word} />
          <Postposition word={this.props.word} />
          <VerbGroup word={this.props.word} />
          <AdditionalInfo word={this.props.word} />
        </CardText>
      </Card >
    );
  }
};

WordCard.propTypes = {
  word: PropTypes.object.isRequired,
  speech: PropTypes.object.isRequired,
  speechEnabled: PropTypes.bool.isRequired,
  expandCard: PropTypes.bool.isRequired,
  addWordToOpenWords: PropTypes.func.isRequired,
  removeWordFromOpenWords: PropTypes.func.isRequired
};

export default WordCard;
