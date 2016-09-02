import React from 'react';

class CheckboxItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(this.props.id);
    }
  }

  render() {
    return (
      <li className="todo-list-item">
        <div className="item">
          <div className="details content" onClick={this.handleClick}>
            <input
              className="checkbox"
              id={`c-${this.props.id}`}
              type="checkbox"
              checked={this.props.completed}
              onChange={() => {}}
            />
            <label htmlFor={`c-${this.props.id}`} />
            <span>{this.props.name}</span>
          </div>
        </div>
      </li>
    );
  }
}

CheckboxItem.propTypes = {
  completed: React.PropTypes.bool
};

CheckboxItem.defaultProps = {
  completed: false
};


export default CheckboxItem;
