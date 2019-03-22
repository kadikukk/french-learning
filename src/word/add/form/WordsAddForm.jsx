import React from 'react';
import PropTypes from 'prop-types';
import { merge, filter, isEmpty, any, values, omit, equals } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Paper, RaisedButton, Stepper, Step, StepLabel } from 'material-ui';

import withFirebase from '../../../firebase/withFirebase';
import FormWithHeading from '../../../util/components/FormWithHeading';
import AddedWordsTable from '../added/AddedWordsTable';
import WordAddForm from '../WordAddForm';
import FileUpload from '../FileUpload';
import ChapterAndSubjectSelect from './ChapterAndSubjectSelect';
import AddInputSelect from './AddInputSelect';
import WordAddCard from '../WordAddCard';
import { initialState } from './WordsAddFormInitialState';


class WordsAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.upload = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if ((!equals(prevProps.subjects, this.props.subjects) && !isEmpty(this.props.subjects)) ||
      (!equals(prevProps.chapters, this.props.chapters) && !isEmpty(this.props.chapters))) {
      const chapterId = !isEmpty(this.props.chapters) ? this.props.chapters[0].uid : null;
      const subjectId = !isEmpty(this.props.subjects) ? this.props.subjects[0].uid : null;

      if (chapterId && subjectId) {
        this.setState({
          chapterId: this.props.chapters[0].uid,
          subjectId: this.props.subjects[0].uid
        });
      }
      else if (chapterId && !subjectId) {
        this.setState({
          chapterId: this.props.chapters[0].uid
        });
      } else if (!chapterId && subjectId)
        this.setState({
          subjectId: this.props.subjects[0].uid
        });
    }
  }

  selectedChapterAndSubjectWords = () => {
    const isSelectedChapterAndSubjectWord = (word) => (
      equals(word.chapterId, this.state.chapterId) && equals(word.subjectId, this.state.subjectId)
    );
    return filter(isSelectedChapterAndSubjectWord, this.props.words);
  };

  handleNextStep = () => {
    this.setState(({ stepIndex }) => ({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    }));
  };

  handleChange = (property, value) => {
    this.setState({
      [property]: value
    });
  }

  handleWordChange = (property, value) => {
    this.setState((prevState) => ({
      word: merge(prevState.word, {
        [property]: value
      })
    }));
  }

  selectedInputChange = (value) => this.handleChange('selectedInput', value);

  chapterChange = (uid) => this.handleChange('chapterId', uid);

  subjectChange = (uid) => this.handleChange('subjectId', uid);


  handleCreateNewWord = (e) => {
    e.preventDefault();
    this.props.firebase.words().push(merge(this.state.word, {
      chapterId: this.state.chapterId,
      subjectId: this.state.subjectId,
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    }));

    this.setState({
      word: initialState.word
    });
  };

  handleAddWordsFromFile = (wordsFromFile) => {
    const updatedWords = wordsFromFile.map((word) => merge(word, {
      chapterId: this.state.chapterId,
      subjectId: this.state.subjectId,
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    }));

    updatedWords.map((word) => this.props.firebase.words().push(word));
  };

  handleEditWord = (index) => {
    this.setState({
      word: merge(initialState.word, this.props.words[index]),
      isWordEdit: true
    });
  };

  handleRemoveWord = (uid) => {
    this.props.firebase.word(uid).remove();
  }

  handleSaveEditedWord = (e) => {
    e.preventDefault();
    this.props.firebase.word(this.state.word.uid).set({
      ...this.state.word,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });
    this.setState({
      word: initialState.word,
      isWordEdit: false
    });
  }


  renderNextButton() {
    return (
      <RaisedButton
        label={<FormattedMessage id="general.next" />}
        primary
        onClick={this.handleNextStep}
        disabled={!this.state.chapterId || !this.state.subjectId}
      />
    );
  }

  renderSaveButton() {
    return (
      <div className="row" style={{ textAlign: 'right', marginTop: '20px' }}>
        <RaisedButton
          label={<FormattedMessage id="general.save" />}
          onClick={this.handleCreateNewChapter}
          primary
        />
      </div>
    );
  }

  renderWordAddCard() {
    const valueExists = (value) => value && !isEmpty(value);
    return (
      <WordAddCard
        isWordEdit={this.state.isWordEdit}
        handleSubmit={this.state.isWordEdit ? this.handleSaveEditedWord : this.handleCreateNewWord}
      >
        <WordAddForm
          word={this.state.word}
          isWordEdit={this.state.isWordEdit}
          handleWordChange={this.handleWordChange}
          expandCard={any(valueExists)(values(omit(['type'], this.state.word)))}
        />
      </WordAddCard>
    );
  }

  renderFileUpload() {
    return (
      <FileUpload
        ref={this.upload}
        addedWords={this.selectedChapterAndSubjectWords()}
        handleAddWord={this.handleCreateNewWord}
        chapterId={this.state.chapterId}
        handleAddWords={this.handleAddWordsFromFile}
      />
    );
  }

  renderStepContent() {
    if (this.state.stepIndex === 0) {
      return (
        <ChapterAndSubjectSelect
          chapterId={this.state.chapterId}
          chapters={this.props.chapters}
          subjectId={this.state.subjectId}
          subjects={this.props.subjects}
          chapterChange={this.chapterChange}
          subjectChange={this.subjectChange}
          fetching={this.props.fetching}
        />
      );
    }
    if (this.state.stepIndex === 1) {
      return (
        <AddInputSelect
          selected={this.state.selectedInput}
          selectedInputChange={this.selectedInputChange}
        />
      );
    }
    if (this.state.stepIndex === 2) {
      const words = this.selectedChapterAndSubjectWords();
      const isFileUploaded = this.upload.current ? this.upload.current.isFileUploaded() : false;

      return (
        <React.Fragment>
          {isEmpty(words) ? '' : (
            <AddedWordsTable
              words={words}
              isWordEdit={this.state.isWordEdit}
              handleEditWord={this.handleEditWord}
              handleRemoveWord={this.handleRemoveWord}
            />
          )}
          {this.state.selectedInput === 'oneByOne'
            ? this.renderWordAddCard()
            : this.renderFileUpload()}
          {this.state.selectedInput === 'fromFile' && isFileUploaded
            ? this.renderWordAddCard() : ''}
        </React.Fragment>
      );
    }
    return '';
  }

  render() {
    return (
      <div style={{ margin: '70px auto' }}>
        <Paper className="pagePaper" style={{ maxWidth: '950px', minHeight: '350px' }}>
          <FormWithHeading title={<FormattedMessage id="words.add.title" />}>
            <Stepper activeStep={this.state.stepIndex}>
              <Step>
                <StepLabel><FormattedMessage id="words.add.step1" /></StepLabel>
              </Step>
              <Step>
                <StepLabel><FormattedMessage id="words.add.step2" /></StepLabel>
              </Step>
              <Step>
                <StepLabel><FormattedMessage id="words.add.step3" /></StepLabel>
              </Step>
            </Stepper>
            <div style={{ marginTop: '20px' }}>
              {this.renderStepContent()}
            </div>
            <div className="row">
              <div className="col s12 m12 l12" style={{ textAlign: 'right' }}>
                {this.state.stepIndex === 2 ? this.renderSaveButton() : this.renderNextButton()}
              </div>
            </div>
          </FormWithHeading>
        </Paper>
      </div>
    );
  }
}

WordsAddForm.propTypes = {
  firebase: PropTypes.object.isRequired,
  chapters: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  words: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired
};

export default withFirebase(WordsAddForm);
