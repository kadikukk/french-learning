import React from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton, Dialog, FlatButton, RaisedButton, SelectField, MenuItem } from 'material-ui';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { FormattedMessage } from 'react-intl';

class Subject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      subjectName: this.props.subject.name,
      deleteConfirmationOpen: false
    };
  }

  hasNameChanged = () => (
    this.props.subject.name !== this.state.subjectName
  );

  subjectNameChange = (name) => {
    this.setState({
      subjectName: name
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

  handleEditSubjectName = () => {
    this.props.onEditSubject(this.props.subject, this.state.subjectName);
    this.setState({
      isEditMode: false
    });
  };

  renderActionButtons() {
    if (this.state.isEditMode) {
      return (
        <RaisedButton
          label={<FormattedMessage id={this.hasNameChanged() ? 'general.save' : 'general.cancel'} />}
          onClick={this.handleEditSubjectName}
        />
      );
    }
    return (
      <React.Fragment>
        <IconButton onClick={this.toggleEdit} iconStyle={{ color: '#757575' }}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={this.toggleDeleteConfirmation} iconStyle={{ color: '#757575' }}>
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
        onClick={() => this.props.onRemoveSubject(this.props.subject.uid)}
      />
    ];

    return (
      <div className="row" style={{ marginBottom: '0px' }}>
        <div className="col s12 m5 l5">
          <SelectField
            floatingLabelText={<FormattedMessage id="subject.chapterName" />}
            value={this.props.chapter.uid}
            fullWidth
            disabled
          >
            {[this.props.chapter].map((chapter, i) => (
              <MenuItem key={i} value={chapter.uid} primaryText={chapter.name} />
            ))}
          </SelectField>
        </div>
        <div className="col s12 m5 l5">
          <TextField
            floatingLabelText={<FormattedMessage id="subject.name" />}
            value={this.state.subjectName}
            fullWidth
            disabled={!this.state.isEditMode}
            onChange={(e, value) => this.subjectNameChange(value)}
          />
        </div>
        <div className="col s12 m2 l2" style={{ display: 'inline-flex', marginTop: '22px', justifyContent: 'flex-end' }}>
          {this.renderActionButtons()}
        </div>
        <Dialog
          actions={deleteConfirmationActions}
          open={this.state.deleteConfirmationOpen}
          onRequestClose={this.toggleDeleteConfirmation}
        >
          <div style={{ textAlign: 'justify' }}>
            <FormattedMessage id="subject.deleteConfirmation" />
          </div>
        </Dialog>
      </div>
    );
  }
}

Subject.propTypes = {
  subject: PropTypes.object.isRequired,
  chapter: PropTypes.object.isRequired,
  onRemoveSubject: PropTypes.func.isRequired,
  onEditSubject: PropTypes.func.isRequired
};

export default Subject;
