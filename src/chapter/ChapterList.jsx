import React from 'react';
import PropTypes from 'prop-types';

import Chapter from './Chapter';

const ChapterList = ({ chapters, onEditChapter, onRemoveChapter }) => (
  chapters.map((chapter) => (
    <Chapter
      key={chapter.uid}
      chapter={chapter}
      onEditChapter={onEditChapter}
      onRemoveChapter={onRemoveChapter}
    />
  ))
);

ChapterList.propTypes = {
  chapters: PropTypes.array.isRequired,
  onEditChapter: PropTypes.func.isRequired,
  onRemoveChapter: PropTypes.func.isRequired
};

export default ChapterList;
