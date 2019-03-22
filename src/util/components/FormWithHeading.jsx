import React from 'react';
import PropTypes from 'prop-types';
import { Subheader, Divider } from 'material-ui';

const FormWithHeading = ({ children, title, onSubmit }) => (
  <form className="formPadding" onSubmit={onSubmit}>
    <Subheader style={{ marginLeft: '-5px', fontSize: '20px' }}>
      {title}
    </Subheader>
    <Divider />
    <div style={{ paddingBottom: '20px' }} />
    {children}
  </form>
);

FormWithHeading.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
};

FormWithHeading.defaultProps = {
  onSubmit: null
};

export default FormWithHeading;
