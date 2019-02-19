import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Subheader } from 'material-ui';

const WordCardRow = ({ fieldName, data }) => (
  <div className="row dataRow">
    <div className="col s5 m3 l3">
      <Subheader
        style={{ lineHeight: 'inherit' }}
      >
        <FormattedMessage id={`words.list.${fieldName}`} />
      </Subheader>
    </div>
    <div className="col s7 m9 l9 dataColumn">
      {data}
    </div>
  </div>
);

WordCardRow.propTypes = {
  fieldName: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default WordCardRow;
