import React from 'react';
import PropTypes from 'prop-types';
import { find, propEq } from 'ramda';

import Subject from './Subject';

const SubjectList = ({ subjects, chapters, onEditSubject, onRemoveSubject }) => (
  subjects.map((subject) => {
    const chapter = find(propEq('uid', subject.chapterId), chapters) || {};

    return (<Subject
      key={subject.uid}
      subject={subject}
      chapter={chapter}
      onEditSubject={onEditSubject}
      onRemoveSubject={onRemoveSubject}
    />
    );
  })
);

SubjectList.propTypes = {
  subjects: PropTypes.array.isRequired,
  onEditSubject: PropTypes.func.isRequired,
  onRemoveSubject: PropTypes.func.isRequired
};

export default SubjectList;
