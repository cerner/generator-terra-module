import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import <%= projectClassName %> from '../src/<%= projectClassName %>';

storiesOf('<%= projectClassName %> ', module)
  .add('Without props', () => (
    <<%= projectClassName %> />
  ))
