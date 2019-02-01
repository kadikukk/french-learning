import React from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton, Dialog, FlatButton, RaisedButton } from 'material-ui';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { FormattedMessage } from 'react-intl';

class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      chapterName: this.props.chapter.name,
      deleteConfirmationOpen: false
    };
  }

  hasNameChanged = () => (
    this.props.chapter.name !== this.state.chapterName
  );

  chapterNameChange = (name) => {
    this.setState({
      chapterName: name
    });
  };

  toggleEdit = () => {
    this.setState((prevState) => ({
      isEditMode: !prevState.isEditMode
    }));
  };

  toggleDeleteConfirmation = () => {
    this.setState((prevState) => ({
      deleteConfirmationOpen: !prevState.deleteConfirmationOpen
    }));
  };

  handleEditChapterName = () => {
    this.props.onEditChapter(this.props.chapter, this.state.chapterName);
    this.setState({
      isEditMode: false
    });
  };

  renderActionButtons() {
    if (this.state.isEditMode) {
      return (
        <RaisedButton
          label={<FormattedMessage id={this.hasNameChanged() ? 'general.save' : 'general.cancel'} />}
          onClick={this.handleEditChapterName}
        />
      );
    }
    return (
      <React.Fragment>
        <IconButton onClick={this.toggleEdit} iconStyle={{ color: '#000000de' }}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={this.toggleDeleteConfirmation} iconStyle={{ color: '#000000de' }}>
          <DeleteIcon />
        </IconButton>
      </React.Fragment>
    );
  }

  render() {
    const deleteConfirmationActions = [
      <FlatButton
        label={<FormattedMessage id="general.cancel" />}
        primary
        onClick={this.toggleDeleteConfirmation}
      />,
      <FlatButton
        label={<FormattedMessage id="general.confirm" />}
        primary
        onClick={() => this.props.onRemoveChapter(this.props.chapter.uid)}
      />
    ];

    return (
      <React.Fragment>
        <div className="col s9 m10">
          <TextField
            floatingLabelText={<FormattedMessage id="chapter.name" />}
            value={this.state.chapterName}
            fullWidth
            disabled={!this.state.isEditMode}
            onChange={(e, value) => this.chapterNameChange(value)}
          />
        </div>
        <div className="col s3 m2" style={{ display: 'inline-flex', marginTop: '22px' }}>
          {this.renderActionButtons()}
        </div>
        <Dialog
          actions={deleteConfirmationActions}
          open={this.state.deleteConfirmationOpen}
          onRequestClose={this.toggleDeleteConfirmation}
        >
          <div style={{ textAlign: 'justify' }}>
            <FormattedMessage id="chapter.deleteConfirmation" />
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

Chapter.propTypes = {
  chapter: PropTypes.object.isRequired,
  onRemoveChapter: PropTypes.func.isRequired,
  onEditChapter: PropTypes.func.isRequired
};

export default Chapter;
