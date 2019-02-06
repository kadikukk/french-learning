import React from 'react';
import { merge } from 'ramda';
import { TextField, SelectField, MenuItem, Paper } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import ExtraSelections from './ExtraSelections';

const wordTypes = ['noun', 'verb', 'adjective', 'expression', 'other'];

class WordAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: {
        type: 'noun',
        word: '',
        translation: '',
        plural: '',
        masculine: '',
        feminine: '',
        gender: 'm',
        preposition: '',
        postposition: '',
        verbGroup: 1,
        additionalInfo: ''
      },
      differentAdjectiveForms: false,
      hasPreposition: false,
      hasIrregularPlural: false,
      hasPostposition: false
    };
  }

  getAdditionalInfoColWidth = () => {
    if (this.state.word.type === 'verb' && this.state.hasPostposition) {
      return 8;
    }
    if (['verb', 'noun'].includes(this.state.word.type) || this.state.hasPreposition || this.state.hasPostposition) {
      return 10;
    }
    return 12;
  };

  handleWordChange = (property, value) => {
    this.setState(({ word }) => ({
      word: merge(word, { [property]: value })
    }));
  };

  handleChange = (property) => {
    this.setState((prevState) => ({
      [property]: !prevState[property]
    }));
  };

  typeChange = (type) => {
    this.handleWordChange('type', type);
    this.setState({
      differentAdjectiveForms: false,
      hasPreposition: false,
      hasIrregularPlural: false,
      hasPostposition: false
    });
  }

  wordChange = (word) => this.handleWordChange('word', word);

  translationChange = (word) => this.handleWordChange('translation', word);

  pluralFormChange = (word) => this.handleWordChange('plural', word);

  masculineFormChange = (word) => this.handleWordChange('masculine', word);

  feminineFormChange = (word) => this.handleWordChange('feminine', word);

  genderChange = (gender) => this.handleWordChange('gender', gender);

  prepositionChange = (preposition) => this.handleWordChange('preposition', preposition);

  postpositionChange = (postposition) => this.handleWordChange('postposition', postposition);

  verbGroupChange = (group) => this.handleWordChange('verbGroup', group);

  additionalInfoChange = (info) => this.handleWordChange('additionalInfo', info);


  toggleDifferentAdjectiveForms = () => this.handleChange('differentAdjectiveForms');

  toggleHasPreposition = () => this.handleChange('hasPreposition');

  toggleHasIrregularPluar = () => this.handleChange('hasIrregularPlural');

  toggleHasPostposition = () => this.handleChange('hasPostposition');


  renderWordField() {
    const wordColWidth = this.state.hasIrregularPlural ? 4 : 6;

    return (
      <div className={`col s12 m${wordColWidth}`}>
        <TextField
          floatingLabelText={<FormattedMessage id="words.add.wordInFrench" />}
          value={this.state.word.word}
          fullWidth
          onChange={(e, value) => this.wordChange(value)}
        />
      </div>
    );
  }

  renderMasculineAndFeminineFields() {
    return (
      <React.Fragment>
        <div className="col s12 m4">
          <TextField
            floatingLabelText={<FormattedMessage id="words.add.masculine" />}
            value={this.state.masculine}
            fullWidth
            onChange={(e, value) => this.masculineFormChange(value)}
          />
        </div>
        <div className="col s12 m4">
          <TextField
            floatingLabelText={<FormattedMessage id="words.add.feminine" />}
            value={this.state.feminine}
            fullWidth
            onChange={(e, value) => this.feminineFormChange(value)}
          />
        </div>
      </React.Fragment>
    );
  }

  renderPluralFormField() {
    return (
      <div className="col s12 m4">
        <TextField
          floatingLabelText={<FormattedMessage id="words.add.plural" />}
          value={this.state.plural}
          fullWidth
          onChange={(e, value) => this.pluralFormChange(value)}
        />
      </div>
    );
  }

  renderGenderSelection() {
    return (
      <div className="col s12 m2">
        <SelectField
          floatingLabelText={<FormattedMessage id="words.add.gender" />}
          value={this.state.word.gender}
          fullWidth
          onChange={(event, key, payload) => this.genderChange(payload)}
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
    return (
      <div className="col s12 m2">
        <TextField
          floatingLabelText={<FormattedMessage id="words.add.preposition" />}
          value={this.state.word.preposition}
          fullWidth
          onChange={(e, value) => this.prepositionChange(value)}
        />
      </div>
    );
  }

  renderPostpositionField() {
    return (
      <div className="col s12 m2">
        <TextField
          floatingLabelText={<FormattedMessage id="words.add.postposition" />}
          value={this.state.word.postposition}
          fullWidth
          onChange={(e, value) => this.postpositionChange(value)}
        />
      </div>
    );
  }

  renderVerbGroupSelection() {
    return (
      <div className="col s12 m2">
        <SelectField
          floatingLabelText={<FormattedMessage id="words.add.verbGroup" />}
          value={this.state.word.verbGroup}
          fullWidth
          onChange={(event, key, payload) => this.verbGroupChange(payload)}
        >
          <MenuItem key="1" value={1} primaryText={1} />
          <MenuItem key="2" value={2} primaryText={2} />
          <MenuItem key="3" value={3} primaryText={3} />
        </SelectField>
      </div>
    );
  }

  render() {
    const additionalInfoColWidth = this.getAdditionalInfoColWidth();
    const wordColWidth = this.state.hasIrregularPlural || this.state.differentAdjectiveForms ? 4 : 6;

    return (
      <Paper style={{ padding: '10px 0px 10px 0px' }}>
        <div className="row">
          <div className="col s12 m3">
            <SelectField
              floatingLabelText={<FormattedMessage id="words.add.type" />}
              value={this.state.word.type}
              fullWidth
              onChange={(event, key, payload) => this.typeChange(payload)}
            >
              {wordTypes.map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                  primaryText={<FormattedMessage id={`words.add.type.${type}`} />}
                />
              ))}
            </SelectField>
          </div>
          <ExtraSelections
            type={this.state.word.type}
            differentAdjectiveForms={this.state.differentAdjectiveForms}
            hasIrregularPlural={this.state.hasIrregularPlural}
            hasPostposition={this.state.hasPostposition}
            hasPreposition={this.state.hasPreposition}
            toggleDifferentAdjectiveForms={this.toggleDifferentAdjectiveForms}
            toggleHasIrregularPluar={this.toggleHasIrregularPluar}
            toggleHasPostposition={this.toggleHasPostposition}
            toggleHasPreposition={this.toggleHasPreposition}
          />
        </div>
        <div className="row" style={{ marginTop: '-20px' }}>
          {this.state.differentAdjectiveForms
            ? this.renderMasculineAndFeminineFields()
            : this.renderWordField()
          }
          {this.state.hasIrregularPlural ? this.renderPluralFormField() : ''}
          <div className={`col s12 m${wordColWidth}`}>
            <TextField
              floatingLabelText={<FormattedMessage id="words.add.translation" />}
              value={this.state.word.translation}
              fullWidth
              onChange={(e, value) => this.translationChange(value)}
            />
          </div>
        </div>
        <div className="row" style={{ marginTop: '-20px' }}>
          {this.state.word.type === 'noun' ? this.renderGenderSelection() : ''}
          {this.state.word.type === 'verb' ? this.renderVerbGroupSelection() : ''}
          {this.state.hasPreposition ? this.renderPrepositionField() : ''}
          {this.state.hasPostposition ? this.renderPostpositionField() : ''}
          <div className={`col s12 m${additionalInfoColWidth}`}>
            <TextField
              floatingLabelText={<FormattedMessage id="words.add.additionalInfo" />}
              value={this.state.word.additionalInfo}
              fullWidth
              onChange={(e, value) => this.additionalInfoChange(value)}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

export default WordAddForm;
