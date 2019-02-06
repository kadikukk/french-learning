import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paper, RadioButtonGroup, RadioButton, Divider } from 'material-ui';

import FormWithHeading from '../../util/components/FormWithHeading';
import AddedWords from './AddedWords';
import WordAddForm from './WordAddForm';
import FileUpload from './FileUpload';

const AddInputSelect = (props) => (
  <div className="row">
    <div className="col s12">
      <RadioButtonGroup
        name="wordAddInput"
        valueSelected={props.selected}
        style={{ display: 'flex' }}
        onChange={(e, value) => props.selectedInputChange(value)}
      >
        <RadioButton
          value="oneByOne"
          label={<FormattedMessage id="words.add.input.oneByOne" />}
        />
        <RadioButton
          value="fromFile"
          label={<FormattedMessage id="words.add.input.file" />}
        />
      </RadioButtonGroup>
    </div>
  </div>
);

AddInputSelect.propTypes = {
  selected: PropTypes.string.isRequired,
  selectedInputChange: PropTypes.func.isRequired
};


class WordsAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInput: 'oneByOne',
      words: []
    };
  }

  selectedInputChange = (value) => {
    this.setState({
      selectedInput: value
    });
  };

  render() {
    return (
      <div style={{ margin: '70px auto' }}>
        <Paper className="pagePaper" style={{ maxWidth: '900px' }}>
          <FormWithHeading title="words.add.title">
            <AddInputSelect
              selected={this.state.selectedInput}
              selectedInputChange={this.selectedInputChange}
            />
            <Divider />
            <AddedWords words={this.state.words} />
            {this.state.selectedInput === 'oneByOne' ? <WordAddForm /> : <FileUpload />}
          </FormWithHeading>
        </Paper>
      </div>
    );
  }
}

export default WordsAddForm;
