import React from 'react';
import ReactDOM from 'react-dom';

import './demo.scss';

import <%= namespacelessProjectClassName %> from '../src/<%= projectClassName %>';

const defaultVariety = <<%= namespacelessProjectClassName %> />;
const primaryVariety = <<%= namespacelessProjectClassName %> name="primary" variant="<%= projectCssClassName %>--primary" />;


ReactDOM.render(defaultVariety, document.getElementById('<%= projectName %>-default'));
ReactDOM.render(primaryVariety, document.getElementById('<%= projectName %>-primary'));
