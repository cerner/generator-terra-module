Terra.describeViewports('<%= moduleClassName %>', ['tiny', 'medium', 'large'], () => {
  describe('Default', () => {
    before(() => browser.url('/#/raw/tests/<%= projectName %>/default-<%= moduleName %>'));

    it('validates the element', () => {
      Terra.validates.element();
    });
  });
});
