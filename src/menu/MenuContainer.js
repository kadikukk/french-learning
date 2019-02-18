import React from 'react';
import PropTypes from 'prop-types';
import { sortBy, compose, toLower, prop } from 'ramda';

import withFirebase from '../firebase/withFirebase';
import Menu from './Menu';

const sortByName = sortBy(compose(toLower, prop('name')));

class MenuContainer extends React.Component {
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
            fetching: false
          });
        }
      });
  };

  render() {
    return (
      <Menu
        chapters={this.state.chapters}
        toggleMenu={this.props.toggleMenu}
        fetching={this.state.fetching}
      />
    );
  }
}

MenuContainer.propTypes = {
  firebase: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default withFirebase(MenuContainer);
