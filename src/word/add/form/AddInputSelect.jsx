import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { RadioButtonGroup, RadioButton } from 'material-ui';

const AddInputSelect = (props) => (
  <div className="row">
    <div className="col s12">
      <RadioButtonGroup
        name="wordAddInput"
        valueSelected={props.selected}
        style={{ display: 'flex' }}
        onChange={(e, value) => props.selectedInputChange(value)}
      >
        <RadioButton
          value="oneByOne"
          label={<FormattedMessage id="words.add.input.oneByOne" />}
        />
        <RadioButton
          value="fromFile"
          label={<FormattedMessage id="words.add.input.file" />}
        />
      </RadioButtonGroup>
    </div>
  </div>
);

AddInputSelect.propTypes = {
  selected: PropTypes.string.isRequired,
  selectedInputChange: PropTypes.func.isRequired
};

export default AddInputSelect;
