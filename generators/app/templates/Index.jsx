/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from '<%= projectName %>/docs/README.md';
import { version } from '<%= projectName %>/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import <%= projectClassName %>Src from '!raw-loader!<%= projectName %>/src/<%= projectClassName %>';

// Example Files

const <%= projectClassName %>Examples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props" src={<%= projectClassName %>Src} />
  </div>
);

export default <%= projectClassName %>Examples;
