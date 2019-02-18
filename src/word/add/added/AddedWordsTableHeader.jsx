import React from 'react';
import { TableHeaderColumn, TableRow } from 'material-ui';
import { FormattedMessage } from 'react-intl';

const AddedWordsTableHeader = () => (
  <TableRow>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="addedWords.french" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="addedWords.masculine" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="addedWords.feminine" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="addedWords.english" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="addedWords.type" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="addedWords.gender" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="addedWords.plural" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="addedWords.preposition" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="addedWords.postposition" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="addedWords.verbGroup" />
    </TableHeaderColumn>
    <TableHeaderColumn className="tableRowColumn">
      <FormattedMessage id="addedWords.additionalInfo" />
    </TableHeaderColumn>
    <TableHeaderColumn />
  </TableRow>
);

export default AddedWordsTableHeader;
