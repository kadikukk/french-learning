import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import windowDimensions from 'react-window-dimensions';

import AuthUserContext from '../session/AuthUserContext';
import { isActiveUser } from '../util/AuthUtil';

import './HomePage.css';

// const imageWidth = (isSmallScreen) => isSmallScreen ? '250px' : '395px';
// const imageHeight = (isSmallScreen) => isSmallScreen ? '273' : '432px';

const AccountNotActivatedMessage = () => (
  <div style={{ margin: '70px auto' }}>
    <Paper className="pagePaper">
      <div className="accountNotActivatedMessage">
        <FormattedMessage id="account.notActivated" />
      </div>
    </Paper>
  </div>
);

const HomePage = ({ width }) => (
  <AuthUserContext.Consumer>
    {authUser => !authUser || isActiveUser(authUser) ? (
      <div className="homePagePaper">
        <Paper className="pagePaper">
          <div className="formPadding">
            <div className="row">
              <div className="col s12 m12 l12">
                <div className="homePageTitle">
                  <FormattedMessage id="home.title" />
                </div>
                <div className="homePageSlogan">
                  <FormattedMessage id="home.intro1" />
                </div>
                <div>
                  {/* <div className="homePageImage">
                    <img
                      src="https://lh5.googleusercontent.com/HgDzORT0S1m4rWUhZg3SK_lOEG3upKWq8wdmJSK1p01NM15UjscFIDqLF0FXuqEP_uDuAY9HSnQ1lnmoZ-JP=w2880-h1388"
                      alt="Frenchman"
                      width={imageWidth(width <= 993)}
                      height={imageHeight(width <= 993)}
                    />
                  </div> */}
                  <div className="homePageDescription">
                    <FormattedMessage id="home.intro2" />
                    <ol className="listStyle">
                      <li><FormattedMessage id="home.point1" /></li>
                      <li><FormattedMessage id="home.point2" /></li>
                      <li><FormattedMessage id="home.point3" /></li>
                    </ol>
                    <div className="homePageOutroMessage">
                      <FormattedMessage id="home.outro" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    ) : <AccountNotActivatedMessage />}
  </AuthUserContext.Consumer>
);

HomePage.propTypes = {
  width: PropTypes.number.isRequired
};

export default windowDimensions()(HomePage);
