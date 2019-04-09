import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { TableRow, TableRowColumn, RaisedButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';

const booleansText = {
  true: 'general.yes',
  false: 'general.no'
};

const CELL_WIDTH = 14;

const isAdmin = (user) => !!user.roles && user.roles.includes('ADMIN');

const AccountsTableRowCell = ({ content }) => {
  if (content) {
    if (content.length > CELL_WIDTH) {
      return <Tooltip theme="light" title={content}>{content}</Tooltip>;
    }
    return content;
  }
  return '';
};

const AccountsTableRow = (props) => (
  <TableRow hoverable>
    <TableRowColumn className="tableRowColumn">
      <AccountsTableRowCell content={props.user.name} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn">
      <AccountsTableRowCell content={props.user.email} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn">
      <AccountsTableRowCell content={<FormattedMessage id={booleansText[props.user.active]} />} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn">
      <AccountsTableRowCell content={<FormattedMessage id={booleansText[isAdmin(props.user)]} />} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn" style={{ width: '40%' }}>
      <span style={{ marginRight: '10px' }}>
        <RaisedButton
          primary
          label={<FormattedMessage id="accounts.activate" />}
          disabled={props.user.active}
          onClick={() => props.activateUser(props.user.uid)}
        />
      </span>
      <span>
        <RaisedButton
          label={<FormattedMessage id="accounts.makeAdministrator" />}
          disabled={isAdmin(props.user)}
          onClick={() => props.makeAdministrator(props.user.uid)}
        />
      </span>
    </TableRowColumn>
  </TableRow>
);

AccountsTableRow.propTypes = {
  user: PropTypes.object.isRequired,
  activateUser: PropTypes.func.isRequired,
  makeAdministrator: PropTypes.func.isRequired
};

export default AccountsTableRow;
