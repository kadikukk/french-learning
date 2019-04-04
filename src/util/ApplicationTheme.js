import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const applicationStyles = getMuiTheme({
  menuItem: {
    selectedTextColor: '#5e35b1'
  },
  palette: {
    primary1Color: '#5e35b1',
    primary2Color: '#7c4dff'
  }
});

const ApplicationTheme = ({ children }) => (
  <MuiThemeProvider muiTheme={applicationStyles}>
    {children}
  </MuiThemeProvider>
);

ApplicationTheme.propTypes = {
  children: PropTypes.node.isRequired
};

export default ApplicationTheme;
