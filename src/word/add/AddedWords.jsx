import React from 'react';
import PropTypes from 'prop-types';

const AddedWord = () => (
  <div>
    {}
  </div>
);

class AddedWords extends React.Component {
  render() {
    return (
      this.props.words.map((word) => (
        <AddedWord />
      ))
    );
  }
}

AddedWords.propTypes = {
  words: PropTypes.array.isRequired
};

export default AddedWords;
