import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';
import './<%= scssFileName %>.scss';

const propTypes = {
 /*
 * Content to be displayed as the name
 */
  name: PropTypes.string,
};

const defaultProps = {
  name: 'default',
};

const <%= moduleClassName %> = ({ name, ...customProps }) => {
  const attributes = Object.assign({}, customProps);
  const <%= moduleClassName %>ClassNames = classNames([
    '<%= cssClassName %>',
    attributes.className,
  ]);

  return (<div {...attributes} className={<%= moduleClassName %>ClassNames} />)
};

<%= moduleClassName %>.propTypes = propTypes;
<%= moduleClassName %>.defaultProps = defaultProps;

export default <%= moduleClassName %>;
