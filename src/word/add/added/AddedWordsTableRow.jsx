import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableRowColumn, IconButton } from 'material-ui';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { grey600 } from 'material-ui/styles/colors';
import { Tooltip } from 'react-tippy';

const ActionButtons = (props) => (
  <React.Fragment>
    <span style={{ marginRight: '15px' }}>
      <IconButton
        iconStyle={{ height: '20px', width: '20px', color: grey600 }}
        style={{ padding: '0px', width: '20px', height: '20px' }}
        onClick={() => props.handleEditWord(props.index)}
        disabled={props.disableEdit}
      >
        <EditIcon />
      </IconButton>
    </span>
    <span>
      <IconButton
        iconStyle={{ height: '20px', width: '20px', color: grey600 }}
        style={{ padding: '0px', width: '20px', height: '20px' }}
        onClick={() => props.handleRemoveWord(props.word.uid)}
      >
        <DeleteIcon />
      </IconButton>
    </span>
  </React.Fragment>
);

ActionButtons.propTypes = {
  word: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleEditWord: PropTypes.func.isRequired,
  handleRemoveWord: PropTypes.func.isRequired,
  disableEdit: PropTypes.bool.isRequired
};


const AddedWordsTableRowCell = ({ content }) => {
  return content ? <Tooltip theme="light" title={content}>{content}</Tooltip> : '';
};

AddedWordsTableRowCell.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};


const AddedWordsTableRow = ({
  word, index, isWordEdit, handleEditWord, handleRemoveWord, disableEdit
}) => (
  <TableRow hoverable>
    <TableRowColumn className="tableRowColumn longContentCellStyle">
      <AddedWordsTableRowCell content={word.word} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn longContentCellStyle">
      <AddedWordsTableRowCell content={word.masculine} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn longContentCellStyle">
      <AddedWordsTableRowCell content={word.feminine} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn longContentCellStyle">
      <AddedWordsTableRowCell content={word.translation} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn longContentCellStyle">
      <AddedWordsTableRowCell content={word.type} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn longContentCellStyle">
      <AddedWordsTableRowCell content={word.gender} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn longContentCellStyle">
      <AddedWordsTableRowCell content={word.plural} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn longContentCellStyle">
      <AddedWordsTableRowCell content={word.preposition} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn longContentCellStyle">
      <AddedWordsTableRowCell content={word.postposition} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn longContentCellStyle">
      <AddedWordsTableRowCell content={word.verbGroup} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn longContentCellStyle">
      <AddedWordsTableRowCell content={word.additionalInfo} />
    </TableRowColumn>
    <TableRowColumn className="tableRowColumn longContentCellStyle">
      {isWordEdit ? '' : (
        <ActionButtons
          index={index}
          word={word}
          handleEditWord={handleEditWord}
          handleRemoveWord={handleRemoveWord}
          disableEdit={disableEdit}
        />
      )}
    </TableRowColumn>
  </TableRow>
);

AddedWordsTableRow.propTypes = {
  word: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isWordEdit: PropTypes.bool.isRequired,
  handleEditWord: PropTypes.func.isRequired,
  handleRemoveWord: PropTypes.func.isRequired,
  disableEdit: PropTypes.bool.isRequired
};

export default AddedWordsTableRow;
