
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const titleize = word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

describe('generator-terra-module:app', () => {
  ['terra-core', 'terra-clinical', 'terra-consumer', 'terra-framework'].forEach((repositoryName) => {
    describe(repositoryName, () => {
      // Change terra-core's repository prefix to be just 'terra'
      const repository = repositoryName === 'terra-core' || repositoryName === 'terra-framework' ? 'terra' : repositoryName;
      const repoNamespace = repositoryName === 'terra-core' || repositoryName === 'terra-framework' ? '' : `${repositoryName.replace('terra-', '')}-`;

      // Capititalize Repository Name for README test assertion
      const title = repository.split('-').map(titleize).join(' ');

      before((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            repository: repositoryName,
            moduleName: 'monster-cookies',
            currentYear: '1000',
          })
          .on('end', done);
      });

      it('creates files', () => {
        assert.file([
          `packages/${repository}-monster-cookies/README.md`,
          `packages/${repository}-monster-cookies/CHANGELOG.md`,
          `packages/${repository}-monster-cookies/src/terra-dev-site/doc/MonsterCookies/MonsterCookies.1.doc.jsx`,
          `packages/${repository}-monster-cookies/src/terra-dev-site/doc/MonsterCookies/ChangeLog.2.doc.jsx`,
          `packages/${repository}-monster-cookies/src/terra-dev-site/test/${repoNamespace}monster-cookies/DefaultMonsterCookies.test.jsx`,
        ]);
      });

      it('creates the License and Notice files', () => {
        assert.file([
          `packages/${repository}-monster-cookies/LICENSE`,
          `packages/${repository}-monster-cookies/NOTICE`,
        ]);
      });

      it('fills the sass file with some dummy sass', () => {
        const scss = `packages/${repository}-monster-cookies/src/MonsterCookies.module.scss`;

        assert.fileContent(scss, ':local {');
        assert.fileContent(scss, '.monster-cookies {');
      });

      it('fills the docs/README file with title cased project data', () => {
        assert.fileContent(`packages/${repository}-monster-cookies/docs/README.md`, `${title} Monster Cookies`);
      });

      it('fills the package.json file with project data', () => {
        const packageJSON = `packages/${repository}-monster-cookies/package.json`;

        assert.fileContent(packageJSON, `git+https://github.com/cerner/${repositoryName}.git`);
        assert.fileContent(packageJSON, `https://github.com/cerner/${repositoryName}/issues`);
        assert.fileContent(packageJSON, '../../node_modules/.bin/wdio ../../node_modules/terra-dev-site/config/wdio/wdio.conf.js');
      });

      it('fills the package.json file with the appropriate keywords', () => {
        const packageJSON = `packages/${repository}-monster-cookies/package.json`;

        if (repository === 'terra-clinical') {
          assert.fileContent(packageJSON, '"Clinical",');
        } else if (repository === 'terra-consumer') {
          assert.fileContent(packageJSON, '"Consumer",');
          assert.fileContent(packageJSON, '"HealtheLife",');
        } else if (repository === 'terra-framework') {
          assert.fileContent(packageJSON, '"Framework",');
        }
      });

      it('fills the README file with project data', () => {
        const readme = `packages/${repository}-monster-cookies/README.md`;

        assert.fileContent(readme, `# ${title} Monster Cookies`);
        assert.fileContent(readme, `https://badgen.net/npm/v/${repository}-monster-cookies`);
        assert.fileContent(readme, `https://badgen.net/travis/cerner/${repositoryName}`);
        assert.fileContent(readme, `npm install ${repository}-monster-cookies`);
        assert.fileContent(readme, `[Documentation](https://github.com/cerner/${repositoryName}/tree/master/packages/${repository}-monster-cookies/docs)`);
      });

      it('fills the site examples Index file with project data', () => {
        const index = `packages/${repository}-monster-cookies/src/terra-dev-site/doc/MonsterCookies/MonsterCookies.1.doc.jsx`;

        assert.fileContent(index, 'import React from \'react\';');
        assert.fileContent(index, 'import DefaultMonsterCookiesSrc from \'!raw-loader!../../../../src/terra-dev-site/doc/example/DefaultMonsterCookies.jsx\';');
        assert.fileContent(index, 'import ReadMe from \'../../../../docs/README.md\';');
        assert.fileContent(index, 'import { name } from \'../../../../package.json\';');
        assert.fileContent(index, 'export default DocPage;');
      });

      it('fills the ChangeLog with appropriate Git URL', () => {
        const changelog = `packages/${repository}-monster-cookies/src/terra-dev-site/doc/MonsterCookies/ChangeLog.2.doc.jsx`;

        assert.fileContent(changelog, 'import React from \'react\';');
        assert.fileContent(changelog, 'import DocTemplate from \'terra-doc-template\';');
        assert.fileContent(changelog, 'import ChangeLog from \'../../../../CHANGELOG.md\';');
        assert.fileContent(changelog, `srcPath="https://github.com/cerner/${repositoryName}/tree/master/packages/monster-cookies"`);
      });

      it('fills the examples Index file with project data', () => {
        const ignore = `packages/${repository}-monster-cookies/.npmignore`;
        assert.fileContent(ignore, 'node_modules');
        assert.fileContent(ignore, '*.log');

        const npmrc = `packages/${repository}-monster-cookies/.npmrc`;
        assert.fileContent(npmrc, 'package-lock=false');
      });
    });
  });
});
