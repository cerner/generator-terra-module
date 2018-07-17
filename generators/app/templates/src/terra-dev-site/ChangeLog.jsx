import React from 'react';
import DocTemplate from 'terra-doc-template';
import ChangeLog from '../../../../CHANGELOG.md';

const DocPage = () => (
  <DocTemplate
    packageName="<%= projectClassName %>"
    srcPath="https://github.com/cerner/<%= repository %>/tree/master/packages/<%= projectClassName %>"
    readme={ChangeLog}
  />
);

export default DocPage;
