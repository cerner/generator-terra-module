import React from 'react';
import initStoryshots from 'storyshots';
import <%= jsxFileName %> from '../../src/<%= jsxFileName %>';

const defaultVariety = <<%= jsxFileName %> />;
const primaryVariety = <<%= jsxFileName %> name="primary" variant="<%= projectCssClassName %>--primary" />;

// Run snapshot tests for react-storybook
initStoryshots();

// Snapshot Tests
it('should render a default component', () => {
  const wrapper = shallow(defaultVariety);
  expect(wrapper).toMatchSnapshot();
});

it('should render a primary component', () => {
  const wrapper = shallow(primaryVariety);
  expect(wrapper).toMatchSnapshot();
});


// Prop Tests
it('should have the class <%= projectCssClassName %>--default', () => {
  const wrapper = shallow(defaultVariety);
  expect(wrapper.prop('className')).toContain('<%= projectCssClassName %> <%= projectCssClassName %>--default');
});

it('should have the class <%= projectCssClassName %>--primary', () => {
  const wrapper = shallow(primaryVariety);
  expect(wrapper.prop('className')).toContain('<%= projectCssClassName %> <%= projectCssClassName %>--primary');
});


// Event Tests
it('should toggle the class u-selected on default', () => {
  const wrapper = shallow(defaultVariety);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('.<%= projectCssClassName %>--default').simulate('click');
  expect(wrapper).toMatchSnapshot();
  wrapper.find('.<%= projectCssClassName %>--default').simulate('click');
  expect(wrapper).toMatchSnapshot();
});

it('should toggle the class u-selected on primary', () => {
  const wrapper = shallow(primaryVariety);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('.<%= projectCssClassName %>--primary').simulate('click');
  expect(wrapper).toMatchSnapshot();
  wrapper.find('.<%= projectCssClassName %>--primary').simulate('click');
  expect(wrapper).toMatchSnapshot();
});
