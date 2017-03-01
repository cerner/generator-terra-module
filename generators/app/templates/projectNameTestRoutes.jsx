/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import <%= namespacelessProjectClassName %>Tests from './<%= namespacelessProjectClassName %>Tests';
import Default<%= namespacelessProjectClassName %> from './Default<%= namespacelessProjectClassName %>';

const routes = (
  <div>
    <Route path="/tests/<%= namespacelessProjectName %>-tests" component={<%= namespacelessProjectClassName %>Tests} />
    <Route path="/tests/<%= namespacelessProjectName %>-tests/default" component={Default<%= namespacelessProjectClassName %>} />
  </div>
);

export default routes;
