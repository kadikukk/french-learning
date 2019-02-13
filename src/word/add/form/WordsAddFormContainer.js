import React from 'react';
import PropTypes from 'prop-types';
import { sortBy, compose, toLower, prop } from 'ramda';

import withFirebase from '../../../firebase/withFirebase';
import WordsAddForm from './WordsAddForm';

const sortByName = sortBy(compose(toLower, prop('name')));

class WordsAddFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: [],
      fetching: false
    };
  }

  componentDidMount() {
    this.onListenForChapters();
  }

  componentWillUnmount() {
    this.props.firebase.chapters().off();
  }

  onListenForChapters = () => {
    this.setState({ fetching: true });
    this.props.firebase
      .chapters()
      .on('value', (snapshot) => {
        const chapterObject = snapshot.val();

        if (chapterObject) {
          const chapterList = Object.keys(chapterObject).map(key => ({
            ...chapterObject[key],
            uid: key
          }));

          this.setState({
            chapters: sortByName(chapterList),
            fetching: false
          });
        } else {
          this.setState({
            chapters: null,
            fetching: false
          });
        }
      });
  };

  render() {
    return (
      <WordsAddForm
        fetching={this.state.fetching}
        chapters={this.state.chapters}
      />
    );
  }
}

WordsAddFormContainer.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default withFirebase(WordsAddFormContainer);