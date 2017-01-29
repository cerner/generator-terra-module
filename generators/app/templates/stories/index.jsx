/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import <%= projectName %> from '../src/<%= projectName %>';

storiesOf('<%= projectName %> ', module)
  .add('Without props', () => (
    <<%= projectName %> />
  ));
