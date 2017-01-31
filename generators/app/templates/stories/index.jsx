/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf, addDecorator } from '@kadira/storybook';
import { checkA11y } from 'storybook-addon-a11y';
import 'storybook-addon-i18n-tools';
import { setOptions } from '@kadira/storybook-addon-options';

import <%= jsxFileName %> from '../src/<%= jsxFileName %>';

setOptions({
  name: '<%= jsxFileName %>',
  url: 'https://github.com/cerner/terra-<%= jsxFileName.split(/(?=[A-Z])/).join('-').toLowerCase() %>',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: false,
  sortStoriesByKind: false,
});

addDecorator(checkA11y);

storiesOf('<%= jsxFileName %> ', module)
  .add('Without props', () => (
    <<%= jsxFileName %> />
  ));
