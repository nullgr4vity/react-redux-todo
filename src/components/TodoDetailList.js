import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import TodoDetailListItem from './TodoDetailListItem';
import { NAV_FILTER_ALL, NAV_FILTER_GID } from './../actions/nav';

class TodoDetailList extends React.Component {

  render() {
    let todos = _.map(this.props.todos, (todo, key) => {
      let status = false;
      if (this.props.visibilityFilter === NAV_FILTER_ALL) {
        status = true;
      }
      if (this.props.visibilityFilter === NAV_FILTER_GID && todo.gid === this.props.activeGid) {
        status = true;
      }

      if (status) {
        return (
          <TodoDetailListItem todo={todo} key={key} />
        );
      }

      return null;
    });

    return (
      <div className="todo-page-content-container">
        <div className="todo-details-list">
          <ul>
            {todos}
          </ul>
        </div>
      </div>
    );
  }
}

TodoDetailList.defaultProps = {
  todos: {}
};

TodoDetailList.propTypes = {
  todos: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    todos: state.todos.items,
    activeGid: state.nav.activeGid,
    visibilityFilter: state.nav.visibilityFilter,
  };
}

export default connect(mapStateToProps)(TodoDetailList);
