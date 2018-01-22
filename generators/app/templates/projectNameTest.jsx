import React from 'react';
import <%= moduleClassName %> from '../../src/<%= moduleClassName %>';

describe('<%= moduleClassName %>', () => {
  const defaultRender = <<%= moduleClassName %> />;

  // Snapshot Tests
  it('should render a default component', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });

  // Prop Tests
  it('should use the default value when no value is given', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.find('.<%= cssClassName %>').text()).toEqual('default');
  });

  // Structure Tests
  it('should have the class <%= cssClassName %>', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.prop('className')).toContain('<%= cssClassName %>');
  });
});
