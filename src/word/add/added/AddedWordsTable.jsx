import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableHeader } from 'material-ui';

import AddedWordsTableHeader from './AddedWordsTableHeader';
import AddedWordsTableRow from './AddedWordsTableRow';

class AddedWordsTable extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <AddedWordsTableHeader />
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover>
              {this.props.words.map((word, i) => (
                <AddedWordsTableRow
                  key={i}
                  word={word}
                  index={i}
                  isWordEdit={this.props.isWordEdit}
                  handleEditWord={this.props.handleEditWord}
                  handleRemoveWord={this.props.handleRemoveWord}
                  disableEdit={this.props.disableEdit}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

AddedWordsTable.propTypes = {
  words: PropTypes.array.isRequired,
  isWordEdit: PropTypes.bool.isRequired,
  handleEditWord: PropTypes.func.isRequired,
  handleRemoveWord: PropTypes.func.isRequired,
  disableEdit: PropTypes.bool.isRequired
};

export default AddedWordsTable;
