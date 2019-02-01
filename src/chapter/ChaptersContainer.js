import React from 'react';
import PropTypes from 'prop-types';

import withFirebase from '../firebase/withFirebase';
import Chapters from './Chapters.jsx';

class ChaptersContainer extends React.Component {
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
      .orderByChild('createdAt')
      .on('value', snapshot => {
        const chapterObject = snapshot.val();

        if (chapterObject) {
          const chapterList = Object.keys(chapterObject).map(key => ({
            ...chapterObject[key],
            uid: key
          }));

          this.setState({
            chapters: chapterList,
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
    return(
      <Chapters
        fetching={this.state.fetching}
        chapters={this.state.chapters}
      />
    );
  }
}

ChaptersContainer.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default withFirebase(ChaptersContainer);
