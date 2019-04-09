import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Paper } from 'material-ui';

import { idLabel } from '../util/IdLabel';

import './Subjects.css';

const Subjects = (props) => (
  <div style={{ margin: '70px auto', maxWidth: '750px' }}>
    <div className="row">
      {props.subjects.map((subject) => (
        <div key={subject.uid} className="col s6 m6 l6">
          <Link
            to={`/chapters/${idLabel(subject.chapterId)}/subjects/${idLabel(subject.uid)}/words`}
          >
            <Paper className="subjectPaper">
              <div style={{ fontSize: '20px', color: '#5e35b1' }}>
                <b>{subject.name.toUpperCase()}</b>
              </div>
            </Paper>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

Subjects.propTypes = {
  subjects: PropTypes.array.isRequired
};

export default Subjects;
