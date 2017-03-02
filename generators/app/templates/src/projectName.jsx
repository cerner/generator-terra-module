import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './<%= scssFileName %>.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

const defaultProps = {
  name: 'default',
  variant: '<%= projectCssClassName %>--default',
};

const <%= projectClassName %> = (props) => (
  <div />
);

<%= projectClassName %>.propTypes = propTypes;
<%= projectClassName %>.defaultProps = defaultProps;

export default <%= projectClassName %>;
