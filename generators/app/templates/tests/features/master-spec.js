import { testRunner } from 'terra-toolkit';
import runnerFor<%= jsxFileName %> from './<%= namespacelessProjectName %>-spec';

testRunner([runnerFor<%= jsxFileName %>]);
