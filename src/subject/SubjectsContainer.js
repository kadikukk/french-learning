import React from 'react';
import PropTypes from 'prop-types';
import { find, filter, propEq } from 'ramda';
import { CircularProgress } from 'material-ui';

import withFirebase from '../firebase/withFirebase';
import Subjects from './Subjects';

class WordsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      chapters: [],
      fetching: false,
      chapterIdLabel: window.location.pathname.split('/')[2]
    };
  }

  componentDidMount() {
    this.onListenForSubjects();
    this.onListenForChapters();
  }

  componentWillUnmount() {
    this.props.firebase.subjects().off();
    this.props.firebase.chapters().off();
  }

  onListenForSubjects = () => {
    this.setState({ fetching: true });
    this.props.firebase
      .subjects()
      .on('value', (snapshot) => {
        const subjectObject = snapshot.val();

        if (subjectObject) {
          const subjectList = Object.keys(subjectObject).map(key => ({
            ...subjectObject[key],
            uid: key
          }));

          this.setState({
            subjects: subjectList,
            fetching: false
          });
        } else {
          this.setState({
            fetching: false
          });
        }
      });
  };

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
            chapters: chapterList,
            fetching: false
          });
        } else {
          this.setState({
            fetching: false
          });
        }
      });
  };

  getChapterId = () => {
    const chapter = find((c) => c.uid.startsWith(this.state.chapterIdLabel), this.state.chapters);
    return chapter ? chapter.uid : '';
  };

  getSubjects = () => {
    const chapterId = this.getChapterId();
    return filter(propEq('chapterId', chapterId), this.state.subjects);
  };

  renderLoader() {
    return (
      <div style={{ width: '100%', margin: 'auto', marginTop: '80px', textAlign: 'center' }}>
        <CircularProgress size={80} thickness={7} />
      </div>
    );
  }

  render() {
    return (
      this.state.fetching ? this.renderLoader() : (
        <Subjects
          subjects={this.getSubjects()}
        />
      )
    );
  }
}

WordsContainer.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default withFirebase(WordsContainer);
