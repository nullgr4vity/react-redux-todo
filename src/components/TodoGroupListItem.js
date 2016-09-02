import React from 'react';

class TodoGroupListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.onClick) {
      return;
    }

    this.props.onClick(this.props.gid);
  }

  render() {
    let tagClass = this.props.tag ? 'red' : 'white';

    return (
      <li className="todo-list-item">
        <div className="item" onClick={this.onClick}>
          <div className="details">
            <span className={`glyphicon glyphicon glyphicon-tag ${tagClass}`} />
            <span className="title">{this.props.value}</span>
            <span className="glyphicon glyphicon-chevron-right" />
          </div>
          <div className="percentage" />
        </div>
      </li>
    );
  }
}

export default TodoGroupListItem;
