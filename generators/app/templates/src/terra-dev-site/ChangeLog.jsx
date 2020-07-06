import React from 'react';
import DocTemplate from 'terra-doc-template';
import ChangeLog from '../../../../CHANGELOG.md';

const DocPage = () => (
  <DocTemplate
    packageName="<%= projectClassName %>"
    srcPath="https://github.com/cerner/<%= repository %>/tree/main/packages/<%= projectClassName %>"
    readme={ChangeLog}
  />
);

export default DocPage;
