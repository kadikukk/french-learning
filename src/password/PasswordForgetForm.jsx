import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Paper, TextField, RaisedButton, CircularProgress } from 'material-ui';

import withFirebase from '../firebase/withFirebase';

const errorMessages = {
  'auth/invalid-email': 'errors.invalidEmail',
  'auth/user-not-found': 'errors.userNotFound'
};

const initialState = {
  email: '',
  error: null,
  fetching: false
};

class PasswordForgetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  emailChange = (value) => this.setState({ email: value });

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ fetching: true });

    this.props.firebase
      .resetPassword(this.state.email)
      .then(() => this.setState(initialState))
      .catch(error => this.setState({ error, fetching: false }));
  };

  render() {
    return (
      <div style={{ margin: '70px auto' }}>
        <Paper className="pagePaper">
          <form className="formPadding" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col s12 m12 l12">
                <TextField
                  floatingLabelText={<FormattedMessage id="forgotPassword.email" />}
                  value={this.state.email}
                  onChange={(e, value) => this.emailChange(value)}
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
                  label={<FormattedMessage id="forgotPassword.reset" />}
                  disabled={isEmpty(this.state.email) || this.state.fetching}
                />
              </div>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

PasswordForgetForm.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default withFirebase(PasswordForgetForm);
