import React from 'react';
import { Paper } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import AuthUserContext from '../session/AuthUserContext';
import { isActiveUser } from '../util/AuthUtil';

const accountNotActivatedMessageStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  height: '100px',
  fontSize: '18px'
};

const AccountNotActivatedMessage = () => (
  <div style={{ margin: '70px auto' }}>
    <Paper className="pagePaper">
      <div style={accountNotActivatedMessageStyle}>
        <FormattedMessage id="account.notActivated" />
      </div>
    </Paper>
  </div>
);

const HomePage = () => (
  <AuthUserContext.Consumer>
    {authUser => !authUser || isActiveUser(authUser) ? <h1>Landing</h1> : <AccountNotActivatedMessage />}
  </AuthUserContext.Consumer>
);

export default HomePage;
