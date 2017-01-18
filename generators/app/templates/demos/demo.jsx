import React from 'react';
import ReactDOM from 'react-dom';

import './demo.scss';

import <%= projectClassName %> from '../src/<%= projectClassName %>';

const defaultVariety = <<%= projectClassName %> />;
const primaryVariety = <<%= projectClassName %> name="primary" variant="<%= projectCssClassName %>--primary" />;


ReactDOM.render(defaultVariety, document.getElementById('<%= projectName %>-default'));
ReactDOM.render(primaryVariety, document.getElementById('<%= projectName %>-primary'));
