import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Paper, TextField, RaisedButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import { SignUpLink } from './SignUpPage.jsx';
import { PasswordForgetLink } from '../password/PasswordForgetPage.jsx';
import withFirebase from '../firebase/withFirebase';

const errorMessages = {
  'auth/user-not-found': 'errors.userNotFound',
  'auth/wrong-password': 'errors.wrongPassword',
  'auth/invalid-email': 'errors.invalidEmail'
};

const SignInPage = () => <SignInForm />;

const initialState = {
  email: '',
  password: '',
  error: null
};

class SignInFormBase extends React.Component {
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

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(initialState);
        this.props.history.push('/home');
      })
      .catch(error => this.setState({ error }));

    event.preventDefault();
  };

  render() {
    const isInvalid = this.state.password === '' || this.state.email === '';

    return (
      <div style={{ margin: '70px auto' }}>
        <Paper className="pagePaper">
          <form className="formPadding" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col s12 m6">
                <TextField
                  floatingLabelText={<FormattedMessage id="signIn.email" />}
                  value={this.state.email}
                  onChange={(e, value) => this.emailChange(value)}
                  fullWidth
                />
              </div>
              <div className="col s12 m6">
                <TextField
                  type="password"
                  floatingLabelText={<FormattedMessage id="signIn.password" />}
                  value={this.state.password}
                  onChange={(e, value) => this.passwordChange(value)}
                  fullWidth
                />
              </div>
            </div>
            {this.state.error && (
              <div className="row">
                <div className="col s12" style={{ color: 'red' }}>
                  {errorMessages[this.state.error.code]
                    ? <FormattedMessage id={errorMessages[this.state.error.code]} />
                    : this.state.error.message}
                </div>
              </div>
            )}
            <div className="row">
              <div className="col s12" style={{ textAlign: 'right' }}>
                <RaisedButton
                  label={<FormattedMessage id="general.cancel" />}
                  onClick={() => window.history.back()}
                  style={{ marginRight: '20px' }}
                />
                <RaisedButton
                  type="submit"
                  primary
                  label={<FormattedMessage id="signIn.submit" />}
                  disabled={isInvalid}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <PasswordForgetLink />
                <SignUpLink />
              </div>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

SignInFormBase.propTypes = {
  firebase: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
