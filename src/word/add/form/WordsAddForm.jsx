import React from 'react';
import PropTypes from 'prop-types';
import { merge, append, isEmpty } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Paper, RaisedButton } from 'material-ui';

import FormWithHeading from '../../../util/components/FormWithHeading';
import AddedWordsTable from '../added/AddedWordsTable';
import WordAddForm from '../WordAddForm';
import FileUpload from '../FileUpload';
import ChapterAndSubjectSelect from './ChapterAndSubjectSelect';
import AddInputSelect from './AddInputSelect';
import WordAddCard from '../WordAddCard';


class WordsAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInput: 'oneByOne',
      chapterId: '',
      subject: '',
      words: []
    };
    this.wordAdd = React.createRef();
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

  handleAddWord = (e) => {
    e.preventDefault();
    const word = merge(this.wordAdd.current.getAddedWord(), {
      chapterId: this.state.chapterId,
      subject: this.state.subject
    });
    this.setState((prevState) => ({
      words: append(word, prevState.words)
    }));
  };

  render() {
    return (
      <div style={{ margin: '70px auto' }}>
        <Paper className="pagePaper" style={{ maxWidth: '950px' }}>
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
            {isEmpty(this.state.words) ? '' : <AddedWordsTable words={this.state.words} />}
            {this.state.selectedInput === 'oneByOne' ? (
              <WordAddCard handleSubmit={this.handleAddWord}>
                <WordAddForm ref={this.wordAdd} />
              </WordAddCard>
            ) : <FileUpload />}
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
