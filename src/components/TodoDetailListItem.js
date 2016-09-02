import React from 'react';
import { connect } from 'react-redux';
import { toggleItem } from './../actions/todos';
import CheckboxItem from './CheckboxItem';


class TodoDetailListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
  }

  onClick(id) {
    let { dispatch } = this.props;
    dispatch(toggleItem(this.props.todo.gid, id));
  }

  render() {
    let todo = this.props.todo;
    return (
      <CheckboxItem
        key={todo.id}
        id={todo.id}
        name={todo.name}
        completed={todo.completed}
        onClick={this.onClick}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    todo: state.todos.items[ownProps.todo.id]
  };
}

export default connect(mapStateToProps)(TodoDetailListItem);
