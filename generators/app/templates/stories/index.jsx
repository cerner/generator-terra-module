/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import <%= jsxFileName %> from '../src/<%= jsxFileName %>';

storiesOf('<%= jsxFileName %> ', module)
  .add('Without props', () => (
    <<%= jsxFileName %> />
  ));
