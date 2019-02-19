import React from 'react';
import PropTypes from 'prop-types';

import WordCardRow from '../../util/components/WordCardRow';

export const Type = ({ word }) => {
  if (!word.type) {
    return '';
  }
  return (
    <WordCardRow
      fieldName="type"
      data={word.type}
    />
  );
};

Type.propTypes = {
  word: PropTypes.object.isRequired
};


export const FrenchWord = ({ word }) => {
  if (word.word) {
    return (
      <WordCardRow
        fieldName="wordInFrench"
        data={word.word}
      />
    );
  }
  return (
    <React.Fragment>
      <WordCardRow
        fieldName="masculine"
        data={word.masculine}
      />
      <WordCardRow
        fieldName="feminine"
        data={word.feminine}
      />
    </React.Fragment>
  );
};

FrenchWord.propTypes = {
  word: PropTypes.object.isRequired
};


export const Plural = ({ word }) => {
  if (!word.plural) {
    return '';
  }
  return (
    <WordCardRow
      fieldName="plural"
      data={word.plural}
    />
  );
};

Plural.propTypes = {
  word: PropTypes.object.isRequired
};


export const Gender = ({ word }) => {
  if (!word.gender) {
    return '';
  }
  return (
    <WordCardRow
      fieldName="gender"
      data={word.gender}
    />
  );
};

Gender.propTypes = {
  word: PropTypes.object.isRequired
};


export const Translation = ({ word }) => (
  <WordCardRow
    fieldName="translation"
    data={word.translation}
  />
);

Translation.propTypes = {
  word: PropTypes.object.isRequired
};


export const Preposition = ({ word }) => {
  if (!word.preposition) {
    return '';
  }
  return (
    <WordCardRow
      fieldName="preposition"
      data={word.preposition}
    />
  );
};

Preposition.propTypes = {
  word: PropTypes.object.isRequired
};


export const Postposition = ({ word }) => {
  if (!word.postposition) {
    return '';
  }
  return (
    <WordCardRow
      fieldName="postposition"
      data={word.postposition}
    />
  );
};

Postposition.propTypes = {
  word: PropTypes.object.isRequired
};


export const VerbGroup = ({ word }) => {
  if (!word.verbGroup) {
    return '';
  }
  return (
    <WordCardRow
      fieldName="verbGroup"
      data={word.verbGroup}
    />
  );
};

VerbGroup.propTypes = {
  word: PropTypes.object.isRequired
};


export const AdditionalInfo = ({ word }) => {
  if (!word.additionalInfo) {
    return '';
  }
  return (
    <WordCardRow
      fieldName="additionalInfo"
      data={word.additionalInfo}
    />
  );
};

AdditionalInfo.propTypes = {
  word: PropTypes.object.isRequired
};
