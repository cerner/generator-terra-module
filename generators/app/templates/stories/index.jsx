/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf, addDecorator } from '@kadira/storybook';
import { checkA11y } from 'storybook-addon-a11y';
import 'storybook-addon-i18n-tools';

import <%= jsxFileName %> from '../src/<%= jsxFileName %>';

addDecorator(checkA11y);

storiesOf('<%= jsxFileName %> ', module)
  .add('Without props', () => (
    <<%= jsxFileName %> />
  ));
