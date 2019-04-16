import React from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton, Paper, CircularProgress } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import withFirebase from '../firebase/withFirebase';
import ChapterList from './ChapterList';
import FormWithHeading from '../util/components/FormWithHeading';
import { compose } from 'recompose';
import withAuthorization from '../session/withAuthorization';
import { isActiveUser } from '../util/AuthUtil';
import { deleteChapter } from '../firebase/functions/FirebaseFunctions';

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

  handleEditChapter = (chapter, name) => {
    this.props.firebase.chapter(chapter.uid).set({
      ...chapter,
      name,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });
  };

  handleRemoveChapter = (uid) => {
    deleteChapter(uid);
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
      <div style={{ width: '100%', margin: 'auto', marginTop: '20px', textAlign: 'center' }}>
        <CircularProgress size={60} thickness={7} />
      </div>
    );
  }

  render() {
    return (
      <div style={{ margin: '70px auto' }}>
        <Paper className="pagePaper">
          <FormWithHeading
            title={<FormattedMessage id="chapters.title" />}
            onSubmit={this.handleCreateNewChapter}
          >
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
              <div className="col s9 m10">
                <TextField
                  floatingLabelText={<FormattedMessage id="chapter.new" />}
                  value={this.state.newChapterName}
                  onChange={(e, value) => this.newChapterNameChange(value)}
                  fullWidth
                />
              </div>
              <div className="col s3 m2" style={{ textAlign: 'right', marginTop: '28px' }}>
                <RaisedButton
                  type="submit"
                  label={<FormattedMessage id="general.add" />}
                  primary
                  disabled={!this.state.newChapterName}
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
  chapters: PropTypes.array,
  fetching: PropTypes.bool.isRequired
};

Chapters.defaultProps = {
  chapters: null
};

export default compose(
  withAuthorization(isActiveUser),
  withFirebase
)(Chapters);
