import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classNamesBind from 'classnames/bind';
import ThemeContext from 'terra-theme-context';
import styles from './<%= scssFileName %>.module.scss';

const cx = classNamesBind.bind(styles);

const propTypes = {
  /**
   * Content to be displayed as the name
   */
  name: PropTypes.string,
};

const defaultProps = {
  name: 'default',
};

const <%= moduleClassName %> = ({ name, ...customProps }) => {
  const theme = React.useContext(ThemeContext);
  const <%= moduleClassName %>ClassNames = classNames(
    cx([
    '<%= cssClassName %>',
    theme.className,
  ]),
    customProps.className,
  );

  return (<div {...customProps} className={<%= moduleClassName %>ClassNames}>{name}</div>);
};

<%= moduleClassName %>.propTypes = propTypes;
<%= moduleClassName %>.defaultProps = defaultProps;

export default <%= moduleClassName %>;
