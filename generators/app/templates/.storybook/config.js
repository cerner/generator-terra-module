/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { configure, setAddon } from '@kadira/storybook';
import withPropsCombinations from 'react-storybook-addon-props-combinations';
import { setOptions } from '@kadira/storybook-addon-options';

function loadStories() {
  require('../stories');
}

setAddon(withPropsCombinations);

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

configure(loadStories, module);
