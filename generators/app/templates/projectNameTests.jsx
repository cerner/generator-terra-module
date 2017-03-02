/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Link } from 'react-router';

const <%= namespacelessProjectClassName %>Tests = () => (
  <div>
    <ul>
      <li><Link to="/tests/<%= namespacelessProjectName %>-tests/default">Default <%= namespacelessProjectClassName %></Link></li>
    </ul>
  </div>
);

export default <%= namespacelessProjectClassName %>Tests;
