import React from 'react';
import PropTypes from 'prop-types';
import { filter } from 'ramda';
import { CircularProgress } from 'material-ui';
import { sortBy, compose, toLower, prop } from 'ramda';

import withFirebase from '../firebase/withFirebase';
import Subjects from './Subjects';

const sortByName = sortBy(compose(toLower, prop('name')));

class SubjectsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      fetching: false
    };
  }

  componentDidMount() {
    this.onListenForSubjects();
  }

  componentWillUnmount() {
    this.props.firebase.subjects().off();
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
            subjects: sortByName(subjectList),
            fetching: false
          });
        } else {
          this.setState({
            fetching: false
          });
        }
      });
  };

  getSubjects = () => {
    const chapterIdLabel = window.location.pathname.split('/')[2];
    const isSelectedChapterSubject = (subject) => subject.chapterId.startsWith(chapterIdLabel);
    return filter(isSelectedChapterSubject, this.state.subjects);
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

SubjectsContainer.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default withFirebase(SubjectsContainer);
