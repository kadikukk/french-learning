import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { CircularProgress, SelectField, MenuItem, TextField } from 'material-ui';

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

export default ChapterAndSubjectSelect;
