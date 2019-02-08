import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Paper, RadioButtonGroup, RadioButton, Divider, RaisedButton,
  SelectField, MenuItem, TextField, CircularProgress
} from 'material-ui';

import FormWithHeading from '../../util/components/FormWithHeading';
import AddedWords from './AddedWords';
import WordAddForm from './WordAddForm';
import FileUpload from './FileUpload';

const ChapterAndSubjectSelect = (props) => (
  <div className="row">
    {props.fetching ? (
      <div style={{ width: '100%', margin: 'auto', marginTop: '20px', textAlign: 'center' }}>
        <CircularProgress size={50} />
      </div>
    ) : (<React.Fragment>
      <div className="col s12 m6">
        <SelectField
          floatingLabelText={<FormattedMessage id="words.add.chapter" />}
          value={props.chapterId}
          fullWidth
          onChange={(event, key, payload) => props.chapterChange(payload)}
          disabled={props.fetching}
        >
          {props.chapters.map((chapter, i) => (
            <MenuItem key={chapter.name} value={chapter.uid} primaryText={chapter.name} />
          ))}
        </SelectField>
      </div>
      <div className="col s12 m6">
        <TextField
          floatingLabelText={<FormattedMessage id="words.add.subject" />}
          value={props.subject}
          onChange={(e, value) => props.subjectChange(value)}
          disabled={props.fetching}
          fullWidth
        />
      </div>
    </React.Fragment>)}
  </div>
);

ChapterAndSubjectSelect.propTypes = {
  chapterId: PropTypes.string.isRequired,
  chapters: PropTypes.array.isRequired,
  subject: PropTypes.string.isRequired,
  chapterChange: PropTypes.func.isRequired,
  subjectChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired
};

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
      chapterId: '',
      subject: '',
      words: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chapters !== this.props.chapters) {
      this.setState({
        chapterId: this.props.chapters[0].uid
      });
    }
  }

  handleChange = (property, value) => {
    this.setState({
      [property]: value
    });
  }

  selectedInputChange = (value) => this.handleChange('selectedInput', value);

  chapterChange = (uid) => this.handleChange('chapterId', uid);

  subjectChange = (subject) => this.handleChange('subject', subject);

  render() {
    return (
      <div style={{ margin: '70px auto' }}>
        <Paper className="pagePaper" style={{ maxWidth: '900px' }}>
          <FormWithHeading title="words.add.title">
            <AddInputSelect
              selected={this.state.selectedInput}
              selectedInputChange={this.selectedInputChange}
            />
            <ChapterAndSubjectSelect
              chapterId={this.state.chapterId}
              chapters={this.props.chapters}
              subject={this.state.subject}
              chapterChange={this.chapterChange}
              subjectChange={this.subjectChange}
              fetching={this.props.fetching}
            />
            <Divider />
            <AddedWords words={this.state.words} />
            {this.state.selectedInput === 'oneByOne' ? <WordAddForm /> : <FileUpload />}
            <div className="row" style={{ textAlign: 'right', marginTop: '20px' }}>
              <RaisedButton
                label={<FormattedMessage id="general.save" />}
                onClick={this.handleCreateNewChapter}
                primary
              />
            </div>
          </FormWithHeading>
        </Paper>
      </div>
    );
  }
}

WordsAddForm.propTypes = {
  chapters: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired
};

export default WordsAddForm;
