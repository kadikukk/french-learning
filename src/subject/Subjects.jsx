import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Paper, GridList, GridTile } from 'material-ui';

import './Subjects.css';
import { grey600 } from 'material-ui/styles/colors';
import { idLabel } from '../util/IdLabel';

const Subjects = (props) => (
  <div style={{ margin: '70px auto', maxWidth: '750px' }}>
    <GridList cols={2} cellHeight="auto" padding={9}>
      {props.subjects.map((subject) => (
        <Link
          key={subject.uid}
          to={`/chapters/${idLabel(subject.chapterId)}/subjects/${idLabel(subject.uid)}`}
        >
          <GridTile style={{ boxShadow: '2px 4px #E0E0E0' }}>
            <Paper className="subjectPaper">
              <div style={{ fontSize: '20px', color: grey600 }}>
                <b>{subject.name.toUpperCase()}</b>
              </div>
            </Paper>
          </GridTile>
        </Link>
      ))}
    </GridList>
  </div>
);

Subjects.propTypes = {
  subjects: PropTypes.array.isRequired
};

export default Subjects;
