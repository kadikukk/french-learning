import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Paper, RaisedButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';

const wordsListPath = () => (
  window.location.pathname.split('/').slice(0, -1).join('/')
);

const WordsTranslateLastPage = (props) => (
  <div className="wordTranslateLastPage">
    <div className="row">
      <div className="col s12 m12 l12">
        <Paper style={{ height: '250px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <div className="row" style={{ justifyContent: 'space-between', textAlign: 'center' }}>
            <div className="col s12 m6 l6">
              <RaisedButton
                label={<FormattedMessage id="word.translate.translateAgain" />}
                onClick={props.translateFromStart}
                style={{ width: '200px', marginBottom: '30px' }}
                primary
              />
            </div>
            <div className="col s12 m6 l6">
              <Link to={wordsListPath()}>
                <RaisedButton
                  label={<FormattedMessage id="word.translate.back" />}
                  style={{ width: '200px' }}
                  primary
                />
              </Link>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  </div>
);

WordsTranslateLastPage.propTypes = {
  translateFromStart: PropTypes.func.isRequired
};

export default WordsTranslateLastPage;
