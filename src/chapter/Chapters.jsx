import React from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton, Paper, CircularProgress } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import withFirebase from '../firebase/withFirebase';
import ChapterList from './ChapterList';
import FormWithHeading from '../util/components/FormWithHeading';

class Chapters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newChapterName: ''
    };
  }

  newChapterNameChange = (name) => {
    this.setState({
      newChapterName: name
    });
  }

  handleEditChapter = (chapter, text) => {
    this.props.firebase.chapter(chapter.uid).set({
      ...chapter,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });
  };

  handleRemoveChapter = (uid) => {
    this.props.firebase.chapter(uid).remove();
  };

  handleCreateNewChapter = (e) => {
    e.preventDefault();
    this.props.firebase.chapters().push({
      name: this.state.newChapterName,
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    });

    this.setState({
      newChapterName: ''
    });
  };

  renderLoader() {
    return (
      <div style={{ width: '100%', margin: 'auto', marginTop: '20px' }}>
        <CircularProgress size={60} style={{ marginLeft: '50%' }} />
      </div>
    );
  }

  render() {
    return (
      <div style={{ margin: '70px auto' }}>
        <Paper className="pagePaper">
          <FormWithHeading title="chapters.title">
            {this.props.chapters && (
              <div className="row">
                {this.props.fetching ? this.renderLoader() : (
                  <ChapterList
                    chapters={this.props.chapters}
                    onEditChapter={this.handleEditChapter}
                    onRemoveChapter={this.handleRemoveChapter}
                  />
                )}
              </div>
            )}
            <div className="row">
              <div className="col s12 m10">
                <TextField
                  floatingLabelText={<FormattedMessage id="chapter.new" />}
                  value={this.state.newChapterName}
                  onChange={(e, value) => this.newChapterNameChange(value)}
                  fullWidth
                />
              </div>
              <div className="col s12 m2" style={{ textAlign: 'right', marginTop: '28px' }}>
                <RaisedButton
                  label={<FormattedMessage id="general.add" />}
                  onClick={this.handleCreateNewChapter}
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

Chapters.propTypes = {
  firebase: PropTypes.object.isRequired,
  chapters: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired
};

export default withFirebase(Chapters);
