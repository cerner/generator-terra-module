/* global browser, Terra */
const viewports = Terra.viewports('tiny', 'medium', 'large');

describe('<%= moduleClassName %>', () => {
  describe('Default', () => {
    before(() => browser.url('/#/raw/tests/<%= projectName %>/default-<%= moduleName %>'));

    Terra.should.beAccessible({ viewports });
    Terra.should.matchScreenshot({ viewports });
  });
});
