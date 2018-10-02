import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ELEMENT_ID, IMAGE_SRC } from '../../constants/variables';
import { MINISTER_ISSUES, SCHEDULES, PASTURES, BASIC_INFORMATION } from '../../constants/strings';

class RupContents extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  renderChild = (child, index) => {
    const { props } = child;
    /*
      setup a reference point for each content
      that's little bit above of the content due to the sticky header
    */
    return (
      <div key={index} className="rup__content">
        <div id={props.elementId} className="rup__content__ref" />
        {child}
      </div>
    );
  }

  render() {
    const { children } = this.props;

    return (
      <div className="rup__contents__container">
        <div className="rup__contents__tabs">
          <a href={`#${ELEMENT_ID.BASIC_INFORMATION}`}>
            <img src={IMAGE_SRC.BASIC_INFORMATION_ICON} alt="icon" />
            <span>{BASIC_INFORMATION}</span>
          </a>
          <a href={`#${ELEMENT_ID.PASTURES}`}>
            <img src={IMAGE_SRC.PASTURES_ICON} alt="icon" />
            <span>{PASTURES}</span>
          </a>
          <a href={`#${ELEMENT_ID.GRAZING_SCHEDULE}`}>
            <img src={IMAGE_SRC.SCHEDULES_ICON} alt="icon" />
            <span>{SCHEDULES}</span>
          </a>
          <a href={`#${ELEMENT_ID.MINISTER_ISSUES}`}>
            <img src={IMAGE_SRC.MINISTER_ISSUES_ICON} alt="icon" />
            <span>{MINISTER_ISSUES}</span>
          </a>
        </div>
        <div className="rup__contents">
          {children.map(this.renderChild)}
        </div>
      </div>
    );
  }
}

export default RupContents;
