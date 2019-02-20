import React from 'react';
import PropTypes from 'prop-types';
import { Subheader, Divider } from 'material-ui';

const FormWithHeading = ({ children, title }) => (
  <div className="formPadding">
    <Subheader style={{ marginLeft: '-5px', fontSize: '20px' }}>
      {title}
    </Subheader>
    <Divider />
    <div style={{ paddingBottom: '20px' }} />
    {children}
  </div>
);

FormWithHeading.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired
};

export default FormWithHeading;
