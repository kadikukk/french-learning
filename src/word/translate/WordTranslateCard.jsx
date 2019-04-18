import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'ramda';
import { Paper, TextField, SelectField, MenuItem, RaisedButton, IconButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import ListenWordIcon from 'material-ui/svg-icons/av/volume-up';
import { grey600, lightGreen500 } from 'material-ui/styles/colors';

import FormWithHeading from '../../util/components/FormWithHeading';
import TextToSpeech from '../../util/TextToSpeech';

import './WordTranslateCard.css';

const styles = {
  speechButton: { padding: '0px', width: '24px', height: '24px', marginTop: '35px' },
  speechButtonIcon: { color: grey600 },
  correctAnswerUnderline: { borderColor: lightGreen500, borderBottomWidth: 2 }
};

const initialState = {
  checkRequested: false,
  word: {
    word: '',
    plural: '',
    masculine: '',
    feminine: '',
    gender: '',
    preposition: '',
    verbGroup: ''
  },
  speechEnabled: false
};

class WordTranslateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.speech = new TextToSpeech();
  }

  componentDidMount() {
    if ('speechSynthesis' in window) {
      this.setState({ speechEnabled: true });
    }
  }

  listenWord = (word) => {
    this.speech.speak(this.props.word[word]);
  };

  isWordCorrect = (word) => {
    if (!this.props.word[word]) {
      return false;
    }
    if (typeof this.props.word[word] !== 'string') {
      const inputAsNumber = parseInt(this.state.word[word]);
      return this.props.word[word] === inputAsNumber;
    }
    return this.props.word[word].toLowerCase() === this.state.word[word].toLowerCase();
  };

  correctAnswer = (word) => {
    return this.state.checkRequested && !this.isWordCorrect(word) && this.props.word[word];
  };

  isAnswerCorrect = (word) => {
    return this.state.checkRequested && this.isWordCorrect(word);
  };

  getClassname = (largeColWidth, smallColWidth) => {
    const largeCol = this.state.speechEnabled ? largeColWidth - 1 : largeColWidth;
    const smallCol = this.state.speechEnabled ? smallColWidth - 1 : smallColWidth;
    return `col s${smallCol} m${largeCol} l${largeCol}`;
  }

  handleChange = (property, value) => {
    this.setState(({ word }) => ({
      word: merge(word, {
        [property]: value
      })
    }));
  };

  frenchWordChange = (word) => this.handleChange('word', word);

  masculineFormChange = (word) => this.handleChange('masculine', word);

  feminineFormChange = (word) => this.handleChange('feminine', word);

  pluralFormChange = (word) => this.handleChange('plural', word);

  genderChange = (value) => this.handleChange('gender', value);

  prepositionChange = (word) => this.handleChange('preposition', word);

  verbGroupChange = (group) => this.handleChange('verbGroup', group);


  handleClickCheckButton = () => {
    this.setState({
      checkRequested: true
    });
  };

  handleClickNextButton = () => {
    this.setState(merge(initialState, { speechEnabled: 'speechSynthesis' in window }));
    this.props.handleClickNext();
  }


  renderAdditionalInfo() {
    if (!this.props.word.additionalInfo) {
      return '';
    }
    return (
      <div className="row" style={{ marginBottom: '0px' }}>
        <div className="col s12 m12 l12">
          <Paper className="additionalInfoPaper">
            <div style={{ margin: '15px' }}>
              {this.props.word.additionalInfo}
            </div>
          </Paper>
        </div>
      </div>
    );
  }

  renderFrenchFields() {
    if (this.props.word.word) {
      return (
        <React.Fragment>
          <div className={this.getClassname(12, 12)}>
            <TextField
              floatingLabelText={<FormattedMessage id="word.translate.french" />}
              value={this.state.word.word}
              fullWidth
              onChange={(e, value) => this.frenchWordChange(value)}
              errorText={this.correctAnswer('word')}
              underlineStyle={this.isAnswerCorrect('word') ? styles.correctAnswerUnderline : {}}
            />
          </div>
          {this.state.speechEnabled ? (
            <div className="col s1 m1 l1" style={{ alignItems: 'left', paddingLeft: '0px' }}>
              <IconButton
                style={styles.speechButton}
                iconStyle={styles.speechButtonIcon}
                onClick={() => this.listenWord('word')}
              >
                <ListenWordIcon />
              </IconButton>
            </div>
          ) : ''}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className={this.getClassname(6, 12)}>
          <TextField
            floatingLabelText={<FormattedMessage id="word.translate.masculine" />}
            value={this.state.word.masculine}
            fullWidth
            onChange={(e, value) => this.masculineFormChange(value)}
            errorText={this.correctAnswer('masculine')}
            underlineStyle={this.isAnswerCorrect('masculine') ? styles.correctAnswerUnderline : {}}
          />
        </div>
        {this.state.speechEnabled ? (
          <div className="col s1 m1 l1" style={{ alignItems: 'left', paddingLeft: '0px' }}>
            <IconButton
              style={styles.speechButton}
              iconStyle={styles.speechButtonIcon}
              onClick={() => this.listenWord('masculine')}
            >
              <ListenWordIcon />
            </IconButton>
          </div>
        ) : ''}
        <div className={this.getClassname(6, 12)}>
          <TextField
            floatingLabelText={<FormattedMessage id="word.translate.feminine" />}
            value={this.state.word.feminine}
            fullWidth
            onChange={(e, value) => this.feminineFormChange(value)}
            errorText={this.correctAnswer('feminine')}
            underlineStyle={this.isAnswerCorrect('feminine') ? styles.correctAnswerUnderline : {}}
          />
        </div>
        {this.state.speechEnabled ? (
          <div className="col s1 m1 l1" style={{ alignItems: 'left', paddingLeft: '0px' }}>
            <IconButton
              style={styles.speechButton}
              iconStyle={styles.speechButtonIcon}
              onClick={() => this.listenWord('feminine')}
            >
              <ListenWordIcon />
            </IconButton>
          </div>
        ) : ''}
      </React.Fragment>
    );
  }

  renderPluralField() {
    if (!this.props.word.plural) {
      return '';
    }
    return (
      <div className="col s12 m12 l12">
        <TextField
          floatingLabelText={<FormattedMessage id="word.translate.plural" />}
          value={this.state.word.plural}
          fullWidth
          onChange={(e, value) => this.pluralFormChange(value)}
          errorText={this.correctAnswer('plural')}
          underlineStyle={this.isAnswerCorrect('plural') ? styles.correctAnswerUnderline : {}}
        />
      </div>
    );
  }

  renderGenderSelect() {
    if (!this.props.word.gender) {
      return '';
    }
    return (
      <div className="col s12 m12 l12">
        <SelectField
          floatingLabelText={<FormattedMessage id="word.translate.gender" />}
          value={this.state.word.gender}
          fullWidth
          onChange={(event, key, payload) => this.genderChange(payload)}
          errorText={this.correctAnswer('gender')}
          underlineStyle={this.isAnswerCorrect('gender') ? styles.correctAnswerUnderline : {}}
        >
          <MenuItem
            key="m"
            value="m"
            primaryText={<FormattedMessage id="words.add.gender.masculine" />}
          />
          <MenuItem
            key="f"
            value="f"
            primaryText={<FormattedMessage id="words.add.gender.feminine" />}
          />
          <MenuItem
            key="m/f"
            value="m/f"
            primaryText={<FormattedMessage id="words.add.gender.feminineMasculine" />}
          />
          <MenuItem
            key="m/pl"
            value="m/pl"
            primaryText={<FormattedMessage id="words.add.gender.masculine.plural" />}
          />
          <MenuItem
            key="f/pl"
            value="f/pl"
            primaryText={<FormattedMessage id="words.add.gender.feminine.plural" />}
          />
        </SelectField>
      </div>
    );
  }

  renderPrepositionField() {
    if (!this.props.word.preposition) {
      return '';
    }
    return (
      <div className="col s12 m12 l12">
        <TextField
          floatingLabelText={<FormattedMessage id="word.translate.preposition" />}
          value={this.state.word.preposition}
          fullWidth
          onChange={(e, value) => this.prepositionChange(value)}
          errorText={this.correctAnswer('preposition')}
          underlineStyle={this.isAnswerCorrect('preposition') ? styles.correctAnswerUnderline : {}}
        />
      </div>
    );
  }

  renderVerbGroupSelect() {
    if (!this.props.word.verbGroup) {
      return '';
    }
    return (
      <div className="col s12 m12 l12">
        <SelectField
          floatingLabelText={<FormattedMessage id="word.translate.verbGroup" />}
          value={this.state.word.verbGroup}
          fullWidth
          onChange={(event, key, payload) => this.verbGroupChange(payload)}
          errorText={this.correctAnswer('verbGroup')}
          underlineStyle={this.isAnswerCorrect('verbGroup') ? styles.correctAnswerUnderline : {}}
        >
          <MenuItem key="1" value={1} primaryText={1} />
          <MenuItem key="2" value={2} primaryText={2} />
          <MenuItem key="3" value={3} primaryText={3} />
        </SelectField>
      </div>
    );
  }

  render() {
    return (
      <div className="wordTranslate">
        <div className="row">
          <div className="col s12 m12 l12">
            <Paper>
              <FormWithHeading title={this.props.word.translation}>
                {this.renderAdditionalInfo()}
                <div className="row">
                  {this.renderFrenchFields()}
                  {this.renderPluralField()}
                  {this.renderGenderSelect()}
                  {this.renderPrepositionField()}
                  {this.renderVerbGroupSelect()}
                </div>
                <div className="row">
                  <div className="col s12 m12 l12" style={{ textAlign: 'right' }}>
                    <RaisedButton
                      label={<FormattedMessage id="general.cancel" />}
                      onClick={() => window.history.back()}
                      style={{ marginRight: '10px' }}
                    />
                    {this.state.checkRequested
                      ? (
                        <RaisedButton
                          label={<FormattedMessage id="general.next" />}
                          primary
                          onClick={this.handleClickNextButton}
                        />
                      )
                      : (
                        <RaisedButton
                          label={<FormattedMessage id="word.translate.check" />}
                          primary
                          onClick={this.handleClickCheckButton}
                        />
                      )}
                  </div>
                </div>
              </FormWithHeading>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

WordTranslateCard.propTypes = {
  word: PropTypes.object.isRequired,
  handleClickNext: PropTypes.func.isRequired
};

export default WordTranslateCard;
