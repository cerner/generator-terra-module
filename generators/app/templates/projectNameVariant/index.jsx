import React from 'react';
import ReactDOM from 'react-dom';

import <%= jsxFileName %> from '../../../../lib/<%= jsxFileName %>';

const noPropsVariety = <<%= jsxFileName %> />;

ReactDOM.render(noPropsVariety, document.getElementById('<%= projectName %>'));
