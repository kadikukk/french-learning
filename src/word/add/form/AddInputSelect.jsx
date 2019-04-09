import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { RadioButtonGroup, RadioButton } from 'material-ui';
import { grey600 } from 'material-ui/styles/colors';

const AddInputSelect = (props) => (
  <React.Fragment>
    <div className="row" style={{ marginTop: '30px' }}>
      <div className="col s12 m12 l12">
        <RadioButtonGroup
          name="wordAddInput"
          valueSelected={props.selected}
          style={{ display: 'flex' }}
          onChange={(e, value) => props.selectedInputChange(value)}
        >
          <RadioButton
            value="oneByOne"
            style={{ maxWidth: '50%' }}
            label={<FormattedMessage id="words.add.input.oneByOne" />}
          />
          <RadioButton
            value="fromFile"
            style={{ maxWidth: '50%' }}
            label={<FormattedMessage id="words.add.input.file" />}
          />
        </RadioButtonGroup>
      </div>
    </div>
    {props.selected === 'fromFile' ? (
      <div className="row" style={{ marginTop: '30px' }}>
        <div className="col s12 m12 l12" style={{ color: grey600 }}>
          <FormattedMessage id="words.add.input.file.message" />
        </div>
        <div className="col s12 m12 l12">
          <a
            href="https://drive.google.com/file/d/1rjVdr97CDiUgBtaSncwzatIiT7xrTes9/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="words.add.input.file.example" />
          </a>
        </div>
      </div>
    ) : ''}
  </React.Fragment>
);

AddInputSelect.propTypes = {
  selected: PropTypes.string.isRequired,
  selectedInputChange: PropTypes.func.isRequired
};

export default AddInputSelect;
