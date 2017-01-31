/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import <%= jsxFileName %> from '../src/<%= jsxFileName %>';

import { checkA11y } from 'storybook-addon-a11y';
import 'storybook-addon-i18n-tools';
import { setOptions } from '@kadira/storybook-addon-options';

setOptions({
  name: '<%= jsxFileName %>',
  url: 'https://github.com/cerner/terra-<%= jsxFileName.toLowerCase() %>',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: false,
  sortStoriesByKind: false,
});

storiesOf('<%= jsxFileName %> ', module)
  .add('Without props', () => (
    <<%= jsxFileName %> />
  ));
