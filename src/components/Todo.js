import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Carousel from './Carousel';
import CarouselItem from './CarouselItem';
import Button from './Button';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import TodoGroupList from './TodoGroupList';
import TodoDetailList from './TodoDetailList';

import { NAV_FILTER_ALL, navigateToGroups } from './../actions/nav';
import { fetchTodosIfNeeded } from './../actions/fetch';
import { removeGroupsBegin, removeGroupsComplete } from './../actions/groups';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.handleBackBtnClick = this.handleBackBtnClick.bind(this);
    this.handleRemoveGroup = this.handleRemoveGroup.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTodosIfNeeded());
  }

  handleBackBtnClick() {
    const { dispatch } = this.props;
    dispatch(navigateToGroups());
  }

  handleRemoveGroup() {
    const { dispatch } = this.props;

    if (!this.props.rgPhase) {
      dispatch(removeGroupsBegin());
    } else {
      dispatch(removeGroupsComplete());
    }
  }

  render() {
    return (
      <Carousel activeIndex={this.props.activePageIndex}>
        <CarouselItem>
          <TodoHeader onAggregateBtnClick={this.handleGroupItemClick} />
          <TodoGroupList
            rgPhase={this.props.rgPhase}
            data={this.props.groups}
            onGroupItemClick={this.handleGroupItemClick}
          />
          <TodoFooter>
            <Button
              type={Button.TRASH}
              onClick={this.handleRemoveGroup}
              isActive={this.props.rgPhase !== TodoGroupList.RG_PHASE_NONE}
            />
          </TodoFooter>
        </CarouselItem>
        <CarouselItem>
          <div className="todo-header">
            <div className="title">{this.props.title}</div>
          </div>
          <TodoDetailList onBackBtnClick={this.handleBackBtnClick} />
          <TodoFooter>
            <Button type={Button.BACK} onClick={this.handleBackBtnClick} />
          </TodoFooter>
        </CarouselItem>
      </Carousel>
    );
  }
}

Todo.propTypes = {
  groups: PropTypes.object,
  activePageIndex: PropTypes.number,
  rgPhase: PropTypes.number
};

Todo.defaultProps = {
  groups: {},
  activePageIndex: 0,
  rgPhase: TodoGroupList.RG_PHASE_NONE
};

function mapStateToProps(state) {
  let title = '';
  if (state.nav.visibilityFilter) {
    title = (state.nav.visibilityFilter === NAV_FILTER_ALL) ?
      'All tasks togheter' : state.groups.items[state.nav.activeGid].title;
  }

  return {
    groups: state.groups.items,
    activePageIndex: state.nav.activePageIndex,
    rgPhase: state.groups.rgPhase,
    title
  };
}

export default connect(mapStateToProps)(Todo);
