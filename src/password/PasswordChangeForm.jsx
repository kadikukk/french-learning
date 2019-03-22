import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { equals } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Paper, TextField, RaisedButton } from 'material-ui';

import AuthUserContext from '../session/AuthUserContext';
import withAuthorization from '../session/withAuthorization';

import withFirebase from '../firebase/withFirebase';
import FormWithHeading from '../util/components/FormWithHeading';

const errorMessages = {
  'auth/weak-password': 'errors.weakPassword',
  'differentPasswords': 'errors.differentPasswords'
};

const initialState = {
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class PasswordChangeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  disableSubmitButton = () => (
    !this.state.passwordOne || !this.state.passwordTwo
  );

  handleChange = (property, value) => {
    this.setState({
      [property]: value
    });
  };

  passwordOneChange = (value) => this.handleChange('passwordOne', value);

  passwordTwoChange = (value) => this.handleChange('passwordTwo', value);

  onSubmit = (e) => {
    e.preventDefault();

    if (equals(this.state.passwordOne, this.state.passwordTwo)) {
      this.props.firebase
        .doPasswordUpdate(this.state.passwordOne)
        .then(() => this.setState(initialState))
        .catch(error => this.setState({ error }));
    } else {
      this.setState({ error: { code: 'differentPasswords' }});
    }
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div style={{ margin: '70px auto' }}>
            <Paper className="pagePaper">
              <FormWithHeading title={authUser.email}>
                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col s12 m6 l6">
                      <TextField
                        type="password"
                        floatingLabelText={<FormattedMessage id="changePassword.newPassword" />}
                        value={this.state.passwordOne}
                        onChange={(e, value) => this.passwordOneChange(value)}
                        fullWidth
                      />
                    </div>
                    <div className="col s12 m6 l6">
                      <TextField
                        type="password"
                        floatingLabelText={<FormattedMessage id="changePassword.confirmPassword" />}
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
                        label={<FormattedMessage id="changePassword.submit" />}
                        disabled={this.disableSubmitButton()}
                      />
                    </div>
                  </div>
                </form>
              </FormWithHeading>
            </Paper>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

PasswordChangeForm.propTypes = {
  firebase: PropTypes.object.isRequired
};

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase
)(PasswordChangeForm);
