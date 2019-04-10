import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { isEmpty, equals } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Paper, TextField, RaisedButton, CircularProgress } from 'material-ui';
import { grey600 } from 'material-ui/styles/colors';

import withFirebase from '../firebase/withFirebase';
import { isStrongPassword } from '../util/AuthUtil';

const errorMessages = {
  'auth/email-already-in-use': 'errors.emailExists',
  'differentPasswords': 'errors.differentPasswords',
  'auth/weak-password': 'errors.weakPassword'
};

const initialState = {
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  fetching: false
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  disableSubmitButton = () => {
    const { name, email, passwordOne, passwordTwo, fetching } = this.state;
    return isEmpty(name) || isEmpty(email) || isEmpty(passwordOne) || isEmpty(passwordTwo) || fetching;
  };

  handleChange = (property, value) => {
    this.setState({
      [property]: value
    });
  }

  nameChange = (value) => this.handleChange('name', value);

  emailChange = (value) => this.handleChange('email', value);

  passwordOneChange = (value) => this.handleChange('passwordOne', value);

  passwordTwoChange = (value) => this.handleChange('passwordTwo', value);

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ fetching: true });

    if (!isStrongPassword(this.state.passwordOne)) {
      this.setState({
        error: { code: 'auth/weak-password' },
        fetching: false
      });
    } else if (equals(this.state.passwordOne, this.state.passwordTwo)) {
      this.props.firebase
        .createUserWithEmailAndPassword(this.state.email, this.state.passwordOne)
        .then((authUser) => this.props.firebase.user(authUser.user.uid).set({
          name: this.state.name,
          email: this.state.email,
          roles: [],
          active: false
        }))
        .then(() => {
          this.setState(initialState);
          this.props.history.push('/');
        })
        .catch(error => this.setState({ error, fetching: false }));
    } else {
      this.setState({
        error: { code: 'differentPasswords' },
        fetching: false
      });
    }
  };

  render() {
    return (
      <div style={{ margin: '70px auto' }}>
        <Paper className="pagePaper">
          <form className="formPadding" onSubmit={this.onSubmit}>
            <div className="row" style={{ marginTop: '20px', textAlign: 'justify', color: grey600 }}>
              <div className="col s12 m12 l12">
                <FormattedMessage id="signUp.introMessage" />
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6 l6">
                <TextField
                  floatingLabelText={<FormattedMessage id="signUp.name" />}
                  value={this.state.name}
                  onChange={(e, value) => this.nameChange(value)}
                  fullWidth
                />
              </div>
              <div className="col s12 m6 l6">
                <TextField
                  floatingLabelText={<FormattedMessage id="signUp.email" />}
                  value={this.state.email}
                  onChange={(e, value) => this.emailChange(value)}
                  fullWidth
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6 l6">
                <TextField
                  type="password"
                  floatingLabelText={<FormattedMessage id="signUp.password" />}
                  value={this.state.passwordOne}
                  onChange={(e, value) => this.passwordOneChange(value)}
                  fullWidth
                />
              </div>
              <div className="col s12 m6 l6">
                <TextField
                  type="password"
                  floatingLabelText={<FormattedMessage id="signUp.confirmPassword" />}
                  value={this.state.passwordTwo}
                  onChange={(e, value) => this.passwordTwoChange(value)}
                  fullWidth
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
                  type="submit"
                  primary
                  label={<FormattedMessage id="signUp.submit" />}
                  disabled={this.disableSubmitButton()}
                />
              </div>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  firebase: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withFirebase
)(SignUpForm);