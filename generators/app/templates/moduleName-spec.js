/* global browser, Terra */
const viewports = Terra.viewports('tiny', 'medium', 'large');

describe('<%= moduleClassName %>', () => {
  describe('Default', () => {
    beforeEach(() => browser.url('/#/<%= rootPath %>/<%= moduleName %>/default-<%= moduleName %>'));

    Terra.should.beAccessible({ viewports });
    Terra.should.matchScreenshot({ viewports });
  });
});
