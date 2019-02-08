import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AddWordIcon from 'material-ui/svg-icons/content/add';
import { Card, CardHeader, CardText, Divider, RaisedButton } from 'material-ui';

const WordAddCard = (props) => (
  <Card style={{ marginTop: '30px' }}>
    <CardHeader
      style={{ paddingLeft: '26px' }}
      titleStyle={{ fontSize: '16px' }}
      title={<FormattedMessage id="words.add.cardTitle" />}
      closeIcon={<AddWordIcon />}
      actAsExpander
      showExpandableButton
    />
    <Divider />
    <CardText expandable style={{ padding: '0px' }}>
      <form onSubmit={props.handleSubmit}>
        <div className="row">
          <div className="col s12" style={{ fontSize: '16px' }}>
            {props.children}
          </div>
        </div>
        <div className="row" style={{ marginRight: '10px', marginTop: '-20px' }}>
          <div className="col s12" style={{ textAlign: 'right' }}>
            <RaisedButton
              label={<FormattedMessage id="general.add" />}
              type="submit"
            />
          </div>
        </div>
      </form>
    </CardText>
  </Card>
);

WordAddCard.propTypes = {
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default WordAddCard;
