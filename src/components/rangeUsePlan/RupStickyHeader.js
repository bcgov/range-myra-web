import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ELEMENT_ID } from '../../constants/variables';

// create a sticky header for dynamic contents
class RupStickyHeader extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    children: null,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const header = document.getElementById(ELEMENT_ID.RUP_STICKY_HEADER);
    if (!this.sticky) {
      this.sticky = header.offsetTop;
    }
    if (window.pageYOffset > this.sticky) {
      header.classList.add('rup__sticky--fixed');
    } else {
      header.classList.remove('rup__sticky--fixed');
    }
  }

  render() {
    return (
      <div id={ELEMENT_ID.RUP_STICKY_HEADER} className="rup__sticky">
        {this.props.children}
      </div>
    );
  }
}

export default RupStickyHeader;
