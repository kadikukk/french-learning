import React from 'react';
import PropTypes from 'prop-types';
import { find, propEq } from 'ramda';
import { TextField, RaisedButton, Paper, CircularProgress, SelectField, MenuItem } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import withFirebase from '../firebase/withFirebase';
import FormWithHeading from '../util/components/FormWithHeading';
import SubjectList from './SubjectList';

class SubjectsAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSubjectName: '',
      chapterId: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chapters !== this.props.chapters) {
      this.setState({
        chapterId: this.props.chapters[0].uid
      });
    }
  }

  newSubjectNameChange = (name) => {
    this.setState({
      newSubjectName: name
    });
  }

  chapterChange = (chapterId) => {
    this.setState({
      chapter: find(propEq('uid', chapterId), this.props.chapters)
    });
  }

  handleEditSubject = (subject, name) => {
    this.props.firebase.subject(subject.uid).set({
      ...subject,
      name,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });
  };

  handleRemoveSubject = (uid) => {
    this.props.firebase.subject(uid).remove();
  };

  handleCreateNewSubject = (e) => {
    e.preventDefault();
    this.props.firebase.subjects().push({
      name: this.state.newSubjectName,
      chapterId: this.state.chapterId,
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    });

    this.setState({
      newSubjectName: ''
    });
  };

  renderLoader() {
    return (
      <div style={{ width: '100%', margin: 'auto', marginTop: '20px', textAlign: 'center' }}>
        <CircularProgress size={60} thickness={7} />
      </div>
    );
  }

  render() {
    return (
      <div style={{ margin: '70px auto' }}>
        <Paper className="pagePaper">
          <FormWithHeading title="subjects.title">
            {this.props.subjects && (
              <div className="row">
                {this.props.fetching ? this.renderLoader() : (
                  <SubjectList
                    subjects={this.props.subjects}
                    chapters={this.props.chapters}
                    onEditSubject={this.handleEditSubject}
                    onRemoveSubject={this.handleRemoveSubject}
                  />
                )}
              </div>
            )}
            <div className="row">
              <div className="col s12 m5 l5">
                <SelectField
                  floatingLabelText={<FormattedMessage id="subject.chapterName" />}
                  value={this.state.chapterId}
                  fullWidth
                >
                  {this.props.chapters.map((chapter) => (
                    <MenuItem key={chapter.uid} value={chapter.uid} primaryText={chapter.name} />
                  ))}
                </SelectField>
              </div>
              <div className="col s12 m5 l5">
                <TextField
                  floatingLabelText={<FormattedMessage id="subject.new" />}
                  value={this.state.newSubjectName}
                  onChange={(e, value) => this.newSubjectNameChange(value)}
                  fullWidth
                />
              </div>
              <div className="col s12 m2 l2" style={{ textAlign: 'right', marginTop: '28px' }}>
                <RaisedButton
                  label={<FormattedMessage id="general.add" />}
                  onClick={this.handleCreateNewSubject}
                  primary
                />
              </div>
            </div>
          </FormWithHeading>
        </Paper>
      </div>
    );
  }
}

SubjectsAddForm.propTypes = {
  firebase: PropTypes.object.isRequired,
  subjects: PropTypes.array,
  chapters: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired
};

SubjectsAddForm.defaultProps = {
  subjects: null
};

export default withFirebase(SubjectsAddForm);
