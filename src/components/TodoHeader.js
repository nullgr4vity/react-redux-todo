import React from 'react';
import { connect } from 'react-redux';
import { NAV_FILTER_ALL, navigateToDetails } from './../actions/nav';

class TodoHeader extends React.Component {
  constructor(props) {
    super(props);
    this.onAggregateBtnClick = this.onAggregateBtnClick.bind(this);
  }

  onAggregateBtnClick() {
    const { dispatch } = this.props;
    dispatch(navigateToDetails({ visibilityFilter: NAV_FILTER_ALL }));
  }

  render() {
    return (
      <div className="todo-header">
        <div>
          <button className="btn btn-success" onClick={this.onAggregateBtnClick}>
            <strong>Show all togheter</strong>
            <span className="glyphicon glyphicon-chevron-right" />
          </button>
        </div>
        <div className="divider">
          <div className="line l" />
          <span>or separatelly</span>
          <div className="line r" />
        </div>
      </div>
    );
  }
}

export default connect()(TodoHeader);
