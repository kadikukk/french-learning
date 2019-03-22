import React from 'react';
import { TableRow, TableHeaderColumn } from 'material-ui';
import { FormattedMessage } from 'react-intl';

const AccountsTableHeader = () => (
  <TableRow>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="accounts.name" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="accounts.email" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="accounts.isActive" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="accounts.isAdmin" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn" style={{ width: '35%' }} />
  </TableRow>
);

export default AccountsTableHeader;
