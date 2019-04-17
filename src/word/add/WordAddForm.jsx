import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, all, values, omit } from 'ramda';
import { TextField, SelectField, MenuItem, Paper } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import ExtraSelections from './form/ExtraSelections';

const wordTypes = ['noun', 'verb', 'adjective', 'expression', 'other'];

const valueDoesntExist = (value) => !value || isEmpty(value);

const wordIsEmpty = (word) => all(valueDoesntExist)(values(omit(['type'], word)));

const initialState = {
  differentAdjectiveForms: false,
  hasPreposition: false,
  hasIrregularPlural: false
};

class WordAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = wordIsEmpty(props.word) ? initialState : {
      differentAdjectiveForms: !isEmpty(props.word.masculine),
      hasPreposition: !isEmpty(props.word.preposition),
      hasIrregularPlural: !isEmpty(props.word.plural)
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.word !== this.props.word) {
      if (wordIsEmpty(this.props.word)) {
        this.setState(initialState);
      } else if (this.props.isWordEdit) {
        this.setState({
          differentAdjectiveForms: !isEmpty(this.props.word.masculine),
          hasPreposition: !isEmpty(this.props.word.preposition),
          hasIrregularPlural: !isEmpty(this.props.word.plural)
        });
      }
    }
  }

  getAddedWord = () => this.props.word;

  getAdditionalInfoColWidth = () => {
    if (this.props.word.type === 'verb' && this.state.hasPreposition) {
      return 8;
    }
    if (['verb', 'noun'].includes(this.props.word.type) || this.state.hasPreposition) {
      return 10;
    }
    return 12;
  };

  handleChange = (property) => {
    this.setState((prevState) => ({
      [property]: !prevState[property]
    }));
  };

  typeChange = (type) => {
    this.props.handleWordChange('type', type);
    this.setState(initialState);
  }

  wordChange = (word) => this.props.handleWordChange('word', word);

  translationChange = (word) => this.props.handleWordChange('translation', word);

  pluralFormChange = (word) => this.props.handleWordChange('plural', word);

  masculineFormChange = (word) => this.props.handleWordChange('masculine', word);

  feminineFormChange = (word) => this.props.handleWordChange('feminine', word);

  genderChange = (gender) => this.props.handleWordChange('gender', gender);

  prepositionChange = (preposition) => this.props.handleWordChange('preposition', preposition);

  verbGroupChange = (group) => this.props.handleWordChange('verbGroup', group);

  additionalInfoChange = (info) => this.props.handleWordChange('additionalInfo', info);


  toggleDifferentAdjectiveForms = () => this.handleChange('differentAdjectiveForms');

  toggleHasPreposition = () => this.handleChange('hasPreposition');

  toggleHasIrregularPluar = () => this.handleChange('hasIrregularPlural');



  renderWordField() {
    const wordColWidth = this.state.hasIrregularPlural ? 4 : 6;

    return (
      <div className={`col s12 m${wordColWidth} l${wordColWidth}`}>
        <TextField
          floatingLabelText={<FormattedMessage id="words.add.wordInFrench" />}
          value={this.props.word.word}
          fullWidth
          onChange={(e, value) => this.wordChange(value)}
        />
      </div>
    );
  }

  renderMasculineAndFeminineFields() {
    return (
      <React.Fragment>
        <div className="col s12 m4 l4">
          <TextField
            floatingLabelText={<FormattedMessage id="words.add.masculine" />}
            value={this.props.word.masculine}
            fullWidth
            onChange={(e, value) => this.masculineFormChange(value)}
          />
        </div>
        <div className="col s12 m4 l4">
          <TextField
            floatingLabelText={<FormattedMessage id="words.add.feminine" />}
            value={this.props.word.feminine}
            fullWidth
            onChange={(e, value) => this.feminineFormChange(value)}
          />
        </div>
      </React.Fragment>
    );
  }

  renderPluralFormField() {
    return (
      <div className="col s12 m4 l4">
        <TextField
          floatingLabelText={<FormattedMessage id="words.add.plural" />}
          value={this.props.word.plural}
          fullWidth
          onChange={(e, value) => this.pluralFormChange(value)}
        />
      </div>
    );
  }

  renderGenderSelection() {
    return (
      <div className="col s12 m2 l2">
        <SelectField
          floatingLabelText={<FormattedMessage id="words.add.gender" />}
          value={this.props.word.gender}
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
    return (
      <div className="col s12 m2 l2">
        <TextField
          floatingLabelText={<FormattedMessage id="words.add.preposition" />}
          value={this.props.word.preposition}
          fullWidth
          onChange={(e, value) => this.prepositionChange(value)}
        />
      </div>
    );
  }

  renderVerbGroupSelection() {
    return (
      <div className="col s12 m2 l2">
        <SelectField
          floatingLabelText={<FormattedMessage id="words.add.verbGroup" />}
          value={this.props.word.verbGroup}
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
      <Paper zDepth={0} style={{ padding: '10px 0px 10px 0px', backgroundColor: '#fdfdfd' }}>
        <div className="row">
          <div className="col s12 m3 l3">
            <SelectField
              floatingLabelText={<FormattedMessage id="words.add.type" />}
              value={this.props.word.type}
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
            type={this.props.word.type}
            differentAdjectiveForms={this.state.differentAdjectiveForms}
            hasIrregularPlural={this.state.hasIrregularPlural}
            hasPreposition={this.state.hasPreposition}
            toggleDifferentAdjectiveForms={this.toggleDifferentAdjectiveForms}
            toggleHasIrregularPluar={this.toggleHasIrregularPluar}
            toggleHasPreposition={this.toggleHasPreposition}
          />
        </div>
        <div className="row" style={{ marginTop: '-20px' }}>
          {this.state.differentAdjectiveForms
            ? this.renderMasculineAndFeminineFields()
            : this.renderWordField()
          }
          {this.state.hasIrregularPlural ? this.renderPluralFormField() : ''}
          <div className={`col s12 m${wordColWidth} l${wordColWidth}`}>
            <TextField
              floatingLabelText={<FormattedMessage id="words.add.translation" />}
              value={this.props.word.translation}
              fullWidth
              onChange={(e, value) => this.translationChange(value)}
            />
          </div>
        </div>
        <div className="row" style={{ marginTop: '-20px' }}>
          {this.props.word.type === 'noun' ? this.renderGenderSelection() : ''}
          {this.props.word.type === 'verb' ? this.renderVerbGroupSelection() : ''}
          {this.state.hasPreposition ? this.renderPrepositionField() : ''}
          <div className={`col s12 m${additionalInfoColWidth} l${additionalInfoColWidth}`}>
            <TextField
              floatingLabelText={<FormattedMessage id="words.add.additionalInfo" />}
              value={this.props.word.additionalInfo}
              fullWidth
              onChange={(e, value) => this.additionalInfoChange(value)}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

WordAddForm.propTypes = {
  word: PropTypes.object.isRequired,
  isWordEdit: PropTypes.bool.isRequired,
  handleWordChange: PropTypes.func.isRequired
};

export default WordAddForm;
