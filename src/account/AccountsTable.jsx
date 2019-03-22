import React from 'react';
import PropTypes from 'prop-types';
import { reject, propEq } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Table, TableHeader, TableBody, Paper, CircularProgress } from 'material-ui';

import AuthUserContext from '../session/AuthUserContext';
import AccountsTableHeader from './AccountsTableHeader';
import AccountsTableRow from './AccountsTableRow';
import FormWithHeading from '../util/components/FormWithHeading';

const usersWithoutMe = (users, account) => {
  return reject(propEq('email', account.email), users);
};

const renderLoader = () => (
  <div style={{ width: '100%', margin: 'auto', marginTop: '20px', textAlign: 'center' }}>
    <CircularProgress size={60} thickness={7} />
  </div>
);

const AccountsTable = (props) => {
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        if (!authUser) {
          return '';
        }
        const usersList = usersWithoutMe(props.users, authUser);

        return (
          <div style={{ margin: '70px auto' }}>
            <Paper className="pagePaper" style={{ maxWidth: '950px', minHeight: '350px' }}>
              <FormWithHeading title={<FormattedMessage id="accounts.title" />}>
                <div className="row">
                  <div className="col s12 m12 l12">
                    {props.fetching ? renderLoader() : (
                      <Table selectable={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                          <AccountsTableHeader />
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} showRowHover>
                          {usersList.map((user) => (
                            <AccountsTableRow
                              key={user.uid}
                              user={user}
                              activateUser={props.activateUser}
                              makeAdministrator={props.makeAdministrator}
                            />
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </div>
              </FormWithHeading>
            </Paper>
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
};

AccountsTable.propTypes = {
  fetching: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  activateUser: PropTypes.func.isRequired,
  makeAdministrator: PropTypes.func.isRequired
};

export default AccountsTable;
