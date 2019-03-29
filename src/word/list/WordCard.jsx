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
  speechButton: { padding: '0px', width: '0px', height: '0px', marginLeft: '5px' },
  speechButtonIcon: { color: grey600 }
};

class WordCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandCard: props.expandCards
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expandCards !== this.props.expandCards) {
      this.setState({
        expandCard: this.props.expandCards
      });
    }
  }

  listenWord = (word) => {
    this.props.speech.speak(word);
  };

  toggleExpandCard = (expanded) => {
    if (!expanded && this.props.expandCards) {
      this.props.toggleExpandCards();
    }
    this.setState({
      expandCard: expanded
    });
  }

  headerTitle = () => {
    const frenchWord = this.props.word.word || this.props.word.masculine + '/' + this.props.word.feminine;
    return (
      <div style={{ display: 'flex', alignItems: 'end' }}>
        {frenchWord}
        <IconButton
          style={styles.speechButton}
          iconStyle={styles.speechButtonIcon}
          onClick={() => this.listenWord(frenchWord)}
        >
          <ListenWordIcon />
        </IconButton>
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
  expandCards: PropTypes.bool.isRequired,
  toggleExpandCards: PropTypes.func.isRequired
};

export default WordCard;
