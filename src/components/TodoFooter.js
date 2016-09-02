import React from 'react';

class TodoFooter extends React.Component {
  render() {
    return (
      <div className="todo-footer">
        {this.props.children}
      </div>
    );
  }
}

export default TodoFooter;
