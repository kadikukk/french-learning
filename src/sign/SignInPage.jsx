import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { Paper, TextField, RaisedButton, CircularProgress } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import withFirebase from '../firebase/withFirebase';

const errorMessages = {
  'auth/user-not-found': 'errors.userNotFound',
  'auth/wrong-password': 'errors.wrongPassword',
  'auth/invalid-email': 'errors.invalidEmail'
};

const initialState = {
  email: '',
  password: '',
  error: null,
  fetching: false
};

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (property, value) => {
    this.setState({
      [property]: value
    });
  }

  emailChange = (email) => this.handleChange('email', email);

  passwordChange = (password) => this.handleChange('password', password);

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ fetching: true });

    this.props.firebase
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(initialState);
        this.props.history.push('/');
      })
      .catch(error => this.setState({ error, fetching: false }));
  };

  render() {
    const isInvalid = this.state.password === '' || this.state.email === '';

    return (
      <div style={{ margin: '70px auto' }}>
        <Paper className="pagePaper">
          <form className="formPadding" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col s12 m6 l6">
                <TextField
                  floatingLabelText={<FormattedMessage id="signIn.email" />}
                  value={this.state.email}
                  onChange={(e, value) => this.emailChange(value)}
                  fullWidth
                  disabled={this.state.fetching}
                />
              </div>
              <div className="col s12 m6 l6">
                <TextField
                  type="password"
                  floatingLabelText={<FormattedMessage id="signIn.password" />}
                  value={this.state.password}
                  onChange={(e, value) => this.passwordChange(value)}
                  fullWidth
                  disabled={this.state.fetching}
                />
              </div>
            </div>
            {this.state.error && (
              <div className="row">
                <div className="col s12 m12 l12" style={{ color: 'red' }}>
                  {errorMessages[this.state.error.code]
                    ? <FormattedMessage id={errorMessages[this.state.error.code]} />
                    : this.state.error.message}
                </div>
              </div>
            )}
            <div className="row">
              <div className="col s12 m12 l12" style={{ textAlign: 'right' }}>
                {this.state.fetching && (
                  <CircularProgress size={25} style={{ marginRight: '20px' }} />
                )}
                <RaisedButton
                  label={<FormattedMessage id="general.cancel" />}
                  onClick={() => window.history.back()}
                  style={{ marginRight: '20px' }}
                  disabled={this.state.fetching}
                />
                <RaisedButton
                  type="submit"
                  primary
                  label={<FormattedMessage id="signIn.submit" />}
                  disabled={isInvalid || this.state.fetching}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12 m12 l12">
                <p>
                  <Link to={'/passwordForget'}>
                    <FormattedMessage id="signIn.forgotPassword" />
                  </Link>
                </p>
                <p>
                  <FormattedMessage id="signIn.noAccount" />
                  {' '}
                  <Link to={'/signup'}>
                    <FormattedMessage id="signIn.signUp" />
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

SignInPage.propTypes = {
  firebase: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withFirebase
)(SignInPage);
