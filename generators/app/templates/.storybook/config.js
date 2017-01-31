/* eslint global-require: 0 */

import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
