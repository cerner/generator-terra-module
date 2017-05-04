/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Link } from 'react-router';

const <%= moduleClassName %>Tests = () => (
  <div>
    <ul>
      <li><Link to="/tests/<%= moduleName %>-tests/default">Default <%= moduleClassName %></Link></li>
    </ul>
  </div>
);

export default <%= moduleClassName %>Tests;
