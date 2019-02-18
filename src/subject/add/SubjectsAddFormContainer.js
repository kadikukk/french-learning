import React from 'react';
import PropTypes from 'prop-types';
import { sortBy, compose, toLower, prop } from 'ramda';

import withFirebase from '../../firebase/withFirebase';
import SubjectsAddForm from './SubjectsAddForm';

const sortByName = sortBy(compose(toLower, prop('name')));

class SubjectsAddFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      chapters: [],
      fetching: false
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
          const subjectList = Object.keys(subjectObject).map(key => {
            // add uid to subject
            if (!subjectObject[key].uid) {
              this.props.firebase.subject(key).set({
                ...subjectObject[key],
                uid: key
              });
            }
            return {
              ...subjectObject[key],
              uid: key
            };
          });

          this.setState({
            subjects: sortByName(subjectList),
            fetching: false
          });
        } else {
          this.setState({
            subjects: null,
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
            chapters: sortByName(chapterList),
            fetching: false
          });
        } else {
          this.setState({
            fetching: false
          });
        }
      });
  };

  render() {
    return (
      <SubjectsAddForm
        fetching={this.state.fetching}
        subjects={this.state.subjects}
        chapters={this.state.chapters}
      />
    );
  }
}

SubjectsAddFormContainer.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default withFirebase(SubjectsAddFormContainer);
