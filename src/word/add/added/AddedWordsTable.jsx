import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableHeader } from 'material-ui';

import AddedWordsTableHeader from './AddedWordsTableHeader';
import AddedWordsTableRow from './AddedWordsTableRow';

class AddedWordsTable extends React.Component {
  render() {
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <AddedWordsTableHeader />
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.words.map((word, i) => (
            <AddedWordsTableRow key={i} word={word} index={i} />
          ))}
        </TableBody>
      </Table>
    );
  }
}

AddedWordsTable.propTypes = {
  words: PropTypes.array.isRequired
};

export default AddedWordsTable;
