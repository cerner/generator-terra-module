import React from 'react';
import { storiesOf } from '@kadira/storybook';
import <%= namespacelessProjectClassName %> from '../src/<%= namespacelessProjectClassName %>';

storiesOf('<%= namespacelessProjectClassName %> ', module)
  .add('Without props', () => (
    <<%= namespacelessProjectClassName %> />
  ));
