import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui';

const AddedWordsTableRow = ({ word }) => (
  <TableRow>
    <TableRowColumn>
      {word.word}
    </TableRowColumn>
    <TableRowColumn>
      {word.masculine}
    </TableRowColumn>
    <TableRowColumn>
      {word.feminine}
    </TableRowColumn>
    <TableRowColumn>
      {word.translation}
    </TableRowColumn>
    <TableRowColumn>
      {word.type}
    </TableRowColumn>
    <TableRowColumn>
      {word.gender}
    </TableRowColumn>
    <TableRowColumn>
      {word.plural}
    </TableRowColumn>
    <TableRowColumn>
      {word.preposition}
    </TableRowColumn>
    <TableRowColumn>
      {word.postposition}
    </TableRowColumn>
    <TableRowColumn>
      {word.verbGroup}
    </TableRowColumn>
    <TableRowColumn>
      {word.additionalInfo}
    </TableRowColumn>
  </TableRow>
);

export default AddedWordsTableRow;
