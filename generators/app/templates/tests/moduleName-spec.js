Terra.describeVeiwports('<%= moduleClassName %>', ['tiny', 'medium', 'large']), () => {
  describe('Default', () => {
    before(() => browser.url('/#/raw/tests/<%= projectName %>/default-<%= moduleName %>'));

    Terra.should.validateElement();
  });
});
