import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import <%= projectClassName %> from '../src/<%= projectClassName %>';

import { checkA11y } from 'storybook-addon-a11y';
import 'storybook-addon-i18n-tools';
import { setOptions } from '@kadira/storybook-addon-options';

setOptions({
  name: '<%= projectClassName %>',
  url: 'https://github.com/cerner/terra-grid',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: false,
  sortStoriesByKind: false,
});

storiesOf('<%= projectClassName %> ', module)
  .add('Without props', () => (
    <<%= projectClassName %> />
  ))
