import { testRunner } from 'terra-toolkit';
import runnerFor<%= namespacelessProjectClassName %> from './<%= namespacelessProjectName %>-spec';

testRunner([runnerFor<%= namespacelessProjectClassName %>]);
