import React, { cloneElement } from 'react';
import ValidComponentsUtils from './../ValidComponentsUtils';

class Carousel extends React.Component {

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="todo carousel slide" data-interval="false" data-ride="carousel">
        <div className="carousel-inner">
        {
          ValidComponentsUtils.map(this.props.children, (item, index) => {
            let isActive = (index === this.props.activeIndex) ? 'active' : '';
            return cloneElement(item, {
              key: index,
              isActive
            });
          })
        }
        </div>
      </div>
    );
  }

}

Carousel.propTypes = {
  activeIndex: React.PropTypes.number
};

Carousel.defaultProps = {
  activeIndex: 0
};

export const CAROUSEL_PAGE_GROUPS = 0;
export const CAROUSEL_PAGE_DETAILS = 1;

export default Carousel;
