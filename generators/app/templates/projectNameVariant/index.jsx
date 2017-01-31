import React from 'react';
import ReactDOM from 'react-dom';

import <%= namespacelessProjectClassName %> from '../../../../lib/<%= namespacelessProjectClassName %>';

const noPropsVariety = <<%= namespacelessProjectClassName %> />;

ReactDOM.render(noPropsVariety, document.getElementById('<%= projectName %>'));
