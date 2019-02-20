import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'ramda';
import { Paper, TextField, SelectField, MenuItem, RaisedButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import FormWithHeading from '../../util/components/FormWithHeading';

import './WordTranslateCard.css';

const initialState = {
  checkRequested: false,
  word: {
    word: '',
    plural: '',
    masculine: '',
    feminine: '',
    gender: '',
    preposition: '',
    postposition: '',
    verbGroup: ''
  }
};

class WordTranslateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  isWordCorrect = (word) => {
    return this.props.word[word] === this.state.word[word];
  };

  correctAnswer = (word) => {
    return this.state.checkRequested && !this.isWordCorrect(word) && this.props.word[word];
  };

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

  postpositionChange = (word) => this.handleChange('postposition', word);

  verbGroupChange = (group) => this.handleChange('verbGroup', group);


  handleClickCheckButton = () => {
    this.setState({
      checkRequested: true
    });
  };

  handleClickNextButton = () => {
    this.setState(initialState);
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
        <div className="col s12 m12 l12">
          <TextField
            floatingLabelText={<FormattedMessage id="word.translate.french" />}
            value={this.state.word.word}
            fullWidth
            onChange={(e, value) => this.frenchWordChange(value)}
            errorText={this.correctAnswer('word')}
          />
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="col s12 m6 l6">
          <TextField
            floatingLabelText={<FormattedMessage id="word.translate.masculine" />}
            value={this.state.word.masculine}
            fullWidth
            onChange={(e, value) => this.masculineFormChange(value)}
            errorText={this.correctAnswer('masculine')}
          />
        </div>
        <div className="col s12 m6 l6">
          <TextField
            floatingLabelText={<FormattedMessage id="word.translate.feminine" />}
            value={this.state.word.feminine}
            fullWidth
            onChange={(e, value) => this.feminineFormChange(value)}
            errorText={this.correctAnswer('feminine')}
          />
        </div>
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
        />
      </div>
    );
  }

  renderPostpositionField() {
    if (!this.props.word.postposition) {
      return '';
    }
    return (
      <div className="col s12 m12 l12">
        <TextField
          floatingLabelText={<FormattedMessage id="word.translate.postposition" />}
          value={this.state.word.postposition}
          fullWidth
          onChange={(e, value) => this.postpositionChange(value)}
          errorText={this.correctAnswer('postposition')}
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
                  {this.renderPostpositionField()}
                  {this.renderVerbGroupSelect()}
                </div>
                <div className="row">
                  <div className="col s12 m12 l12" style={{ textAlign: 'right' }}>
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
