import React, { PropTypes } from 'react';
import classNames from 'classnames';
import path from 'path';
import '../src/<%= projectName %>.scss';

class <%= projectClassName %> extends React.Component {
  constructor() {
    super();
    this.state = {
      isSelected: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isSelected: !this.state.isSelected });
  }

  render() {
    const classes = classNames(['<%= projectCssClassName %>',
      this.props.variant,
      this.state.isSelected && 'u-selected',
    ]);


    if (!this.props.name) {
      return null;
    }
    if (!this.props.variant) {
      return null;
    }
    return (<button
      className={classes}
      onClick={this.handleClick}
    >Terra, {this.props.name}</button>);
  }
}

<%= projectClassName %>.propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

<%= projectClassName %>.defaultProps = {
  name: 'default',
  variant: '<%= projectCssClassName %>--default',
};

export const includePaths = path.join(__dirname, '../src/');

export default <%= projectClassName %>;
