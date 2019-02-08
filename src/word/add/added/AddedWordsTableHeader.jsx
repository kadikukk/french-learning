import React from 'react';
import { TableHeaderColumn, TableRow } from 'material-ui';

const AddedWordsTableHeader = () => (
  <TableRow>
    <TableHeaderColumn>
      French
    </TableHeaderColumn>
    <TableHeaderColumn>
      Masc.
    </TableHeaderColumn>
    <TableHeaderColumn>
      Femin.
    </TableHeaderColumn>
    <TableHeaderColumn>
      English
    </TableHeaderColumn>
    <TableHeaderColumn>
      Type
    </TableHeaderColumn>
    <TableHeaderColumn>
      Gender
    </TableHeaderColumn>
    <TableHeaderColumn>
      Plural
    </TableHeaderColumn>
    <TableHeaderColumn>
      Prep.
    </TableHeaderColumn>
    <TableHeaderColumn>
      Postp.
    </TableHeaderColumn>
    <TableHeaderColumn>
      Group
    </TableHeaderColumn>
    <TableHeaderColumn>
      Info
    </TableHeaderColumn>
  </TableRow>
);

export default AddedWordsTableHeader;
