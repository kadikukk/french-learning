import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AddWordIcon from 'material-ui/svg-icons/content/add';
import { Card, CardHeader, CardText, Divider, RaisedButton } from 'material-ui';

const WordAddCard = (props) => (
  <div className="row">
    <div className="col s12 m12 l12">
      <Card initiallyExpanded={props.expandCard} style={{ marginTop: '30px' }}>
        <CardHeader
          style={{ paddingLeft: '26px' }}
          titleStyle={{ fontSize: '16px' }}
          title={<FormattedMessage id={props.isWordEdit ? 'words.add.cardEditTitle' : 'words.add.cardTitle'} />}
          closeIcon={<AddWordIcon />}
          actAsExpander
          showExpandableButton
        />
        <Divider />
        <CardText expandable style={{ padding: '0px' }}>
          <form onSubmit={props.handleSubmit}>
            <div className="row">
              <div className="col s12 m12 l12" style={{ fontSize: '16px' }}>
                {props.children}
              </div>
            </div>
            <div className="row" style={{ marginRight: '10px', marginTop: '-20px' }}>
              <div className="col s12 m12 l12" style={{ textAlign: 'right' }}>
                <RaisedButton
                  label={<FormattedMessage id={props.isWordEdit ? 'general.save' : 'general.add'} />}
                  type="submit"
                />
              </div>
            </div>
          </form>
        </CardText>
      </Card>
    </div>
  </div>
);

WordAddCard.propTypes = {
  children: PropTypes.node.isRequired,
  isWordEdit: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  expandCard: PropTypes.bool
};

WordAddCard.defaultProps = {
  expandCard: false
};

export default WordAddCard;
