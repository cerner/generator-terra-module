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
          `packages/${repository}-monster-cookies/src/terra-dev-site/doc/MonsterCookies/MonsterCookies.1.doc.mdx`,
          `packages/${repository}-monster-cookies/src/terra-dev-site/doc/MonsterCookies/ChangeLog.2.doc.mdx`,
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

      it('fills the package.json file with project data', () => {
        const packageJSON = `packages/${repository}-monster-cookies/package.json`;

        assert.fileContent(packageJSON, `git+https://github.com/cerner/${repositoryName}.git`);
        assert.fileContent(packageJSON, `https://github.com/cerner/${repositoryName}/issues`);
        assert.fileContent(packageJSON, 'npm run wdio-default && npm run wdio-lowlight && npm run wdio-fusion');
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
        assert.fileContent(readme, `[Documentation](https://github.com/cerner/${repositoryName}/tree/main/packages/${repository}-monster-cookies/docs)`);
      });

      it('fills the site examples Index file with project data', () => {
        const index = `packages/${repository}-monster-cookies/src/terra-dev-site/doc/MonsterCookies/MonsterCookies.1.doc.mdx`;

        assert.fileContent(index, `import { Badge } from '${repository}-monster-cookies/package.json?dev-site-package';`);
        assert.fileContent(index, 'import DefaultMonsterCookies from \'../example/DefaultMonsterCookies?dev-site-example\';');
        assert.fileContent(index, `import PropsTable from '${repository}-monster-cookies/src/MonsterCookies?dev-site-props-table';`);
        assert.fileContent(index, `# ${title} Monster Cookies`);
        assert.fileContent(index, '<DefaultMonsterCookies />');
      });

      it('fills the ChangeLog with appropriate Git URL', () => {
        const changelog = `packages/${repository}-monster-cookies/src/terra-dev-site/doc/MonsterCookies/ChangeLog.2.doc.mdx`;

        assert.fileContent(changelog, `import { Badge } from '${repository}-monster-cookies/package.json?dev-site-package';`);
        assert.fileContent(changelog, `import ChangeLog from '${repository}-monster-cookies/CHANGELOG.md';`);
        assert.fileContent(changelog, '<Badge />');
        assert.fileContent(changelog, '<ChangeLog />');
      });

      it('fills the examples Index file with project data', () => {
        const ignore = `packages/${repository}-monster-cookies/.npmignore`;
        assert.fileContent(ignore, 'tests/**/__snapshots__/');
        assert.fileContent(ignore, '*.log');

        const npmrc = `packages/${repository}-monster-cookies/.npmrc`;
        assert.fileContent(npmrc, 'package-lock=false');
      });
    });
  });
});
