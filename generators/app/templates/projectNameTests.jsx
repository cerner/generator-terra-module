/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router';

const <%= moduleClassName %>Tests = () => (
  <div>
    <ul>
      <li><Link to="/tests/<%= moduleName %>/default-<%= moduleName %>"><%= moduleClassName %> - Default</Link></li>
    </ul>
  </div>
);

export default <%= moduleClassName %>Tests;
