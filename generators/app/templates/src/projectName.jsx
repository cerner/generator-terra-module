import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './<%= scssFileName %>.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

const defaultProps = {
  name: 'default',
  variant: '<%= cssClassName %>--default',
};

const <%= moduleClassName %> = (props) => (
  <div />
);

<%= moduleClassName %>.propTypes = propTypes;
<%= moduleClassName %>.defaultProps = defaultProps;

export default <%= moduleClassName %>;
