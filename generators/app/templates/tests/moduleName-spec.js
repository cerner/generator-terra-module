/* global browser, Terra, before */
Terra.viewports('tiny', 'medium', 'large').forEach((viewport) => {
  describe('<%= moduleClassName %>', () => {
    before(() => {
      browser.setViewportSize(viewport);
    });

    describe('Default', () => {
      before(() => {
        browser.url('/#/raw/tests/<%= projectName %>/default-<%= moduleName %>');
      });

      Terra.should.validateElement();
    });
  });
});
