/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Route } from 'react-router';
import <%= moduleClassName %>Tests from './<%= moduleClassName %>Tests';

// Test Cases
import Default<%= moduleClassName %> from './Default<%= moduleClassName %>';

const routes = (
  <div>
    <Route path="/tests/<%= moduleName %>" component={<%= moduleClassName %>Tests} />
    <Route path="/tests/<%= moduleName %>/default-<%= moduleName %>" component={Default<%= moduleClassName %>} />
  </div>
);

export default routes;
