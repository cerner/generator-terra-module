/* eslint-disable import/no-webpack-loader-syntax, import/first, import/extensions, import/no-duplicates, import/no-unresolved */
import React from 'react';
import DocTemplate from 'terra-doc-template';
import ReadMe from '../../../../docs/README.md';
import { name } from '../../../../package.json';

// Component Source
import <%= projectClassName %>Src from '!raw-loader!../../../../src/<%= projectClassName %>';

// Example Files
import Default<%= projectClassName %> from '../example/Default<%= projectClassName %>';
import Default<%= projectClassName %>Src from '!raw-loader!../../../../src/terra-dev-site/doc/example/Default<%= projectClassName %>.jsx';

const DocPage = () => (
  <DocTemplate
    packageName={name}
    readme={ReadMe}
    srcPath={`https://github.com/cerner/<%= repository %>/tree/master/packages/${name}`}
    examples={[
      {
        title: 'Default <%= projectClassName %>',
        example: <Default<%= projectClassName %> />,
        source: Default<%= projectClassName %>Src,
      },
    ]}
    propsTables={[
      {
        componentName: '<%= projectClassName %>',
        componentSrc: <%= projectClassName %>Src,
      },
    ]}
  />
);

export default DocPage;
