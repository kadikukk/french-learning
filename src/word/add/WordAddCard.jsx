import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AddWordIcon from 'material-ui/svg-icons/content/add';
import { Card, CardHeader, CardText, Divider, RaisedButton } from 'material-ui';

class WordAddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandCard: props.isWordEdit
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isWordEdit !== this.props.isWordEdit) {
      this.setState((prevState) => ({
        expandCard: prevState.expandCard || this.props.isWordEdit
      }));
    }
  }

  toggleExpandCard = (expanded) => {
    this.setState({ expandCard: expanded });
  };

  render() {
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <Card
            style={{ marginTop: '30px', backgroundColor: '#fdfdfd' }}
            expanded={this.state.expandCard}
            onExpandChange={this.toggleExpandCard}
          >
            <CardHeader
              style={{ paddingLeft: '26px' }}
              titleStyle={{ fontSize: '16px' }}
              title={<FormattedMessage id={this.props.isWordEdit ? 'words.add.cardEditTitle' : 'words.add.cardTitle'} />}
              closeIcon={<AddWordIcon />}
              actAsExpander
              showExpandableButton
            />
            <Divider />
            <CardText expandable style={{ padding: '0px' }}>
              <div>
                <div className="row">
                  <div className="col s12 m12 l12" style={{ fontSize: '16px' }}>
                    {this.props.children}
                  </div>
                </div>
                <div className="row" style={{ marginRight: '10px', marginTop: '-20px' }}>
                  <div className="col s12 m12 l12" style={{ textAlign: 'right' }}>
                    <RaisedButton
                      label={<FormattedMessage id={this.props.isWordEdit ? 'general.save' : 'general.add'} />}
                      primary
                      onClick={this.props.handleSubmit}
                      disabled={this.props.disableAddButton}
                    />
                  </div>
                </div>
              </div>
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

WordAddCard.propTypes = {
  children: PropTypes.node.isRequired,
  isWordEdit: PropTypes.bool.isRequired,
  disableAddButton: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default WordAddCard;
