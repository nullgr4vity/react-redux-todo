import React from 'react';

class CarouselItem extends React.Component {
  render() {
    let cn = this.props.isActive ? this.props.isActive : '';

    return (
      <div className={`todo-page item ${cn}`}>
        <div className="todo-page-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

CarouselItem.propsTypes = {
  isActive: React.PropTypes.string
};

CarouselItem.defaultProps = {
  isActive: ''
};

export default CarouselItem;
