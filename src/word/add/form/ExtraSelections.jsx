import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'material-ui';
import { FormattedMessage } from 'react-intl';

class ExtraSelections extends React.Component {

  renderNounSelections() {
    return (
      <div className="col s12 m9 l9" style={{ height: '56px', display: 'inline-flex', alignItems: 'flex-end' }}>
        <Checkbox
          label={<FormattedMessage id="words.add.hasIrregularPlural" />}
          checked={this.props.hasIrregularPlural}
          onCheck={this.props.toggleHasIrregularPluar}
        />
      </div>
    );
  }

  renderVerbSelections() {
    return (
      <div className="col s12 m9 l9" style={{ height: '56px', display: 'inline-flex', alignItems: 'flex-end' }}>
        <Checkbox
          label={<FormattedMessage id="words.add.hasPostposition" />}
          checked={this.props.hasPostposition}
          onCheck={this.props.toggleHasPostposition}
        />
      </div>
    );
  }

  renderAdjectiveSelections() {
    return (
      <React.Fragment>
        <div className="col s12 m6 l6" style={{ height: '56px', display: 'inline-flex', alignItems: 'flex-end' }}>
          <Checkbox
            label={<FormattedMessage id="words.add.hasDifferentForms" />}
            checked={this.props.differentAdjectiveForms}
            onCheck={this.props.toggleDifferentAdjectiveForms}
          />
        </div>
        <div className="col s12 m3 l3" style={{ height: '56px', display: 'inline-flex', alignItems: 'flex-end' }}>
          <Checkbox
            label={<FormattedMessage id="words.add.hasPreposition" />}
            checked={this.props.hasPreposition}
            onCheck={this.props.toggleHasPreposition}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        {this.props.type === 'noun' ? this.renderNounSelections() : ''}
        {this.props.type === 'verb' ? this.renderVerbSelections() : ''}
        {this.props.type === 'adjective' ? this.renderAdjectiveSelections() : ''}
      </div>
    );
  }
}

ExtraSelections.propTypes = {
  type: PropTypes.string.isRequired,
  differentAdjectiveForms: PropTypes.bool.isRequired,
  hasIrregularPlural: PropTypes.bool.isRequired,
  hasPostposition: PropTypes.bool.isRequired,
  hasPreposition: PropTypes.bool.isRequired,
  toggleDifferentAdjectiveForms: PropTypes.func.isRequired,
  toggleHasIrregularPluar: PropTypes.func.isRequired,
  toggleHasPostposition: PropTypes.func.isRequired,
  toggleHasPreposition: PropTypes.func.isRequired
};

export default ExtraSelections;
