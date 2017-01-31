// Test Suite Purpose:
//   To test the <%= namespacelessProjectClassName %>

import { By } from 'selenium-webdriver';

export default function () {
  describe('[XXXXXX] <%= titlecaseProjectName %>', () => {
    it('Displays with default properties', (done) => {
      jasmine.driver.get('http://localhost:8080/<%= namespacelessProjectName %>-variant.html').then(() =>
        jasmine.driver.findElement(By.className('<%= projectCssClassName %> <%= projectCssClassName %>--default')).getText(),
      )
      .then((text) => {
        expect(text).toBe('Terra, default');
        done();
      });
    });

    it('Transitions to the selected property when clicked', (done) => {
      jasmine.driver.get('http://localhost:8080/<%= namespacelessProjectName %>-variant.html').then(() =>
        jasmine.driver.findElement(By.className('<%= projectCssClassName %> <%= projectCssClassName %>--default')).click(),
      )
      .then(() =>
        jasmine.driver.findElement(By.className('<%= projectCssClassName %> <%= projectCssClassName %>--default u-selected')).getText(),
      )
      .then((text) => {
        expect(text).toBe('Terra, default');
        done();
      });
    });
  });
}
