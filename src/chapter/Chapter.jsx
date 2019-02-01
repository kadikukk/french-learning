import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import { FormattedMessage } from 'react-intl';

class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      chapterName: this.props.chapter.name
    };
  }

  chapterNameChange = (name) => {
    this.setState({
      chapterName: name
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="col s6">
          <TextField
            floatingLabelText={<FormattedMessage id="chapter.name" />}
            value={this.state.chapterName}
            fullWidth
            onChange={(e, value) => this.chapterNameChange(value)}
          />
        </div>
      </React.Fragment>
    );
  }
}

Chapter.propTypes = {
  chapter: PropTypes.object.isRequired
};

export default Chapter;
