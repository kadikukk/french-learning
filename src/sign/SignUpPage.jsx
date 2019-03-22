import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, equals, merge } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Paper, TextField, RaisedButton } from 'material-ui';
import { grey600, lightGreen600 } from 'material-ui/styles/colors';

import withFirebase from '../firebase/withFirebase';

const errorMessages = {
  'auth/email-already-in-use': 'errors.emailExists',
  'differentPasswords': 'errors.differentPasswords'
};

const initialState = {
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
  submitted: false
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  messageColor = () => (
    this.state.submitted ? lightGreen600 : grey600
  );

  disableSubmitButton = () => {
    const { name, email, passwordOne, passwordTwo } = this.state;
    return isEmpty(name) || isEmpty(email) || isEmpty(passwordOne) || isEmpty(passwordTwo);
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

    if (equals(this.state.passwordOne, this.state.passwordTwo)) {
      this.props.firebase
        .createUserWithEmailAndPassword(this.state.email, this.state.passwordOne)
        .then((authUser) => this.props.firebase.user(authUser.user.uid).set({
          name: this.state.name,
          email: this.state.email,
          active: false
        }))
        .then(() => {
          this.setState(merge(initialState, { submitted: true }));
          this.props.history.push('/');
        })
        .catch(error => this.setState({ error }));
    } else {
      this.setState({ error: { code: 'differentPasswords' } });
    }
  };

  render() {
    return (
      <div style={{ margin: '70px auto' }}>
        <Paper className="pagePaper">
          <form className="formPadding" onSubmit={this.onSubmit}>
            <div className="row" style={{ marginTop: '20px', textAlign: 'justify', color: this.messageColor() }}>
              <div className="col s12 m12 l12">
                {this.state.submitted
                  ? <FormattedMessage id="signUp.introMessage" />
                  : <FormattedMessage id="signUp.introMessage" />}
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

export default withFirebase(SignUpForm);