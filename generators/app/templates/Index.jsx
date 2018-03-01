/* eslint-disable import/no-extraneous-dependencies, import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import IndexTemplate from 'terra-dev-site/src/IndexPageTemplate';

import ReadMe from '<%= srcPath %>/docs/README.md';
import { version } from '<%= srcPath %>/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import <%= projectClassName %>Src from '!raw-loader!<%= srcPath %>/src/<%= projectClassName %>';

// Example Files
import Default<%= projectClassName %> from './<%= importPath %>Default<%= projectClassName %>';
import Default<%= projectClassName %>Src from '!raw-loader!./<%= importPath %>Default<%= projectClassName %>.jsx';

const <%= projectClassName %>Examples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />

    <h1 style={{ paddingBottom: '0.3em', borderBottom: '1px solid #eaecef' }}>Examples</h1>
    <IndexTemplate
      title="<%= projectClassName %> - Default"
      example={<Default<%= projectClassName %> />}
      exampleSrc={Default<%= projectClassName %>Src}
    />

    <PropsTable id="props" src={<%= projectClassName %>Src} />
  </div>
);

export default <%= projectClassName %>Examples;
