import React from 'react';
import PropTypes from 'prop-types';
import { Subheader, Divider } from 'material-ui';

const FormWithHeading = ({ children, title, onSubmit, rightContent }) => (
  <form className="formPadding" onSubmit={onSubmit}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ textAlign: 'left' }}>
        <Subheader style={{ marginLeft: '-5px', fontSize: '20px', width: 'auto' }}>
          {title}
        </Subheader>
      </div>
      <div style={{ textAlign: 'right', fontSize: '20px', color: '#0000008a', marginTop: '12px' }}>
        {rightContent}
      </div>
    </div>
    <Divider />
    <div style={{ paddingBottom: '20px' }} />
    {children}
  </form>
);

FormWithHeading.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  rightContent: PropTypes.node,
  onSubmit: PropTypes.func
};

FormWithHeading.defaultProps = {
  onSubmit: null,
  rightContent: null
};

export default FormWithHeading;
