/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from '../docs/README.md';
// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import <%= projectClassName %>Src from '!raw-loader!../src/<%= projectClassName %>.jsx';

const <%= projectClassName %>Examples = () => (
  <div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props" src={<%= projectClassName %>Src} />
  </div>
);

export default <%= projectClassName %>Examples;
