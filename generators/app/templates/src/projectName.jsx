import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import styles from './<%= scssFileName %>.scss';

const cx = classNames.bind(styles);

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
  const <%= moduleClassName %>ClassNames = cx([
    '<%= cssClassName %>',
    attributes.className,
  ]);

  return (<div {...attributes} className={<%= moduleClassName %>ClassNames} />)
};

<%= moduleClassName %>.propTypes = propTypes;
<%= moduleClassName %>.defaultProps = defaultProps;

export default <%= moduleClassName %>;
