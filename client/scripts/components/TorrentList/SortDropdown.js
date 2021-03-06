import {formatMessage, FormattedMessage, injectIntl} from 'react-intl';
import classnames from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';

import Dropdown from '../General/FormElements/Dropdown';
import SortProperties from '../../constants/SortProperties';

const METHODS_TO_BIND = ['getDropdownHeader', 'handleItemSelect'];
const SORT_PROPERTIES = ['name', 'eta', 'downloadRate', 'uploadRate', 'ratio',
  'percentComplete', 'downloadTotal', 'uploadTotal', 'sizeBytes', 'added'];

class SortDropdown extends React.Component {
  constructor() {
    super();

    METHODS_TO_BIND.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  getDropdownHeader() {
    return (
      <a className="dropdown__button">
        <label className="dropdown__label">
          <FormattedMessage
            id="torrents.sort.title"
            defaultMessage="Sort By"
          />
        </label>
        <span className="dropdown__value">
          <FormattedMessage
            id={SortProperties[this.props.selectedProperty].id}
            defaultMessage={SortProperties[this.props.selectedProperty].defaultMessage}
          />
        </span>
      </a>
    );
  }

  getDropdownMenus() {
    let items = SORT_PROPERTIES.map((sortProp) => {
      return {
        displayName: this.props.intl.formatMessage(
          SortProperties[sortProp]
        ),
        selected: this.props.selectedProperty === sortProp,
        property: sortProp
      };
    });

    // Dropdown expects an array of arrays.
    return [items];
  }

  handleItemSelect(selection) {
    let {direction} = this.props;
    let {property} = selection;

    if (this.props.selectedProperty === property) {
      direction = direction === 'asc' ? 'desc' : 'asc';
    } else {
      direction = 'asc';
    }

    this.props.onSortChange({direction, property});
  }

  render() {
    if (this.props.selectedProperty == null) {
      return null;
    }

    return (
      <Dropdown
        handleItemSelect={this.handleItemSelect}
        header={this.getDropdownHeader()}
        menuItems={this.getDropdownMenus()} />
    );
  }
}

export default injectIntl(SortDropdown);
