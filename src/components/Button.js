import React from 'react';

class Button extends React.Component {

  constructor(props) {
    super(props);

    this.handleBackBtnClick = this.handleBackBtnClick.bind(this);
    this.handleTrashBtnClick = this.handleTrashBtnClick.bind(this);
  }

  handleTrashBtnClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  handleBackBtnClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }


  renderTrashButton() {
    let clazz = this.props.isActive ? 'btn-danger' : 'btn-default';

    return (
      <button type="button" className={`btn ${clazz}`} onClick={this.handleTrashBtnClick}>
        <span className="glyphicon glyphicon-trash" />
      </button>
    );
  }

  renderBackButton() {
    return (
      <button type="button" className="btn btn-default" onClick={this.handleBackBtnClick}>
        <span className="glyphicon glyphicon-chevron-left" />
      </button>
    );
  }

  render() {
    switch (this.props.type) {
      case Button.TRASH:
        return this.renderTrashButton();
      case Button.BACK:
        return this.renderBackButton();
      default:
        return null;
    }
  }
}

Button.TRASH = 'trash';
Button.BACK = 'back';

Button.defaultProps = {
  isActive: false
};

Button.propTypes = {
  type: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool
};

export default Button;

