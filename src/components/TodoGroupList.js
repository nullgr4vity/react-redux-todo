import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import TodoGroupListItem from './TodoGroupListItem';
import CheckboxItem from './CheckboxItem';
import { selectGroupToRemove } from './../actions/groups';
import { NAV_FILTER_GID, navigateToDetails } from './../actions/nav';

class TodoGroupList extends React.Component {
  constructor(props) {
    super(props);

    this.onGroupItemClick = this.onGroupItemClick.bind(this);
    this.handleSelectGroupToRemove = this.handleSelectGroupToRemove.bind(this);
  }

  onGroupItemClick(gid) {
    const { dispatch } = this.props;
    dispatch(navigateToDetails({ visibilityFilter: NAV_FILTER_GID, gid }));
  }

  handleSelectGroupToRemove(gid) {
    let { dispatch } = this.props;
    dispatch(selectGroupToRemove(gid));
  }

  renderGroupsRemoveCheckboxes() {
    return _.map(this.props.data, (group) => (
      <CheckboxItem
        key={group.id}
        id={group.id}
        completed={this.props.gidOnRemoveList.indexOf(group.id) >= 0}
        onClick={this.handleSelectGroupToRemove}
      />
    ));
  }

  renderGroupsTitles() {
    return _.map(this.props.data, (group, key) => (
      <TodoGroupListItem
        key={key}
        gid={group.id}
        value={group.title}
        tag={group.tag}
        onClick={this.onGroupItemClick}
      />
    ));
  }

  render() {
    let groups = this.renderGroupsTitles();
    let checkboxes = this.renderGroupsRemoveCheckboxes();

    let clazz = (this.props.rgPhase === TodoGroupList.RG_PHASE_NONE) ? '' : 'slided';

    return (
      <div className="todo-page-content-container">
        <div className="todo-groups-list" style={{ position: 'absolute', zIndex: '0' }}>
          <ul>
            {checkboxes}
          </ul>
        </div>
        <div
          className={`todo-groups-list slide-layer ${clazz}`}
          style={{ zIndex: '100', backgroundColor: 'white' }}
        >
          <ul>
            {groups}
          </ul>
        </div>
      </div>
    );
  }
}

TodoGroupList.RG_PHASE_NONE = 0;
TodoGroupList.RG_PHASE_BEGIN = 1;

TodoGroupList.defaultProps = {
  data: {},
  gidOnRemoveList: [],
  rgGhase: TodoGroupList.RG_PHASE_NONE
};

TodoGroupList.propTypes = {
  data: React.PropTypes.object,
  rgPhase: React.PropTypes.number,
  gidOnRemoveList: React.PropTypes.array
};

function mapStateToProps(state) {
  return {
    gidOnRemoveList: state.groups.gidOnRemoveList
  };
}

export default connect(mapStateToProps)(TodoGroupList);
