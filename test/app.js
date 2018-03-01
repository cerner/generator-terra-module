'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

const titleize = word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

describe('generator-terra-module:app', function () {
  ['terra-core', 'terra-clinical', 'terra-consumer', 'terra-framework'].forEach(repositoryName => {
    describe(repositoryName, function () {
      // Change terra-core's repository prefix to be just 'terra'
      const repository = repositoryName === 'terra-core' || repositoryName === 'terra-framework' ? 'terra' : repositoryName;

      // Capititalize Repository Name for README test assertion
      const title = repository.split('-').map(titleize).join(' ');

      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            repository: repositoryName,
            moduleName: 'monster-cookies',
            curentYear: '1000'
          })
          .on('end', done);
      });

      it('creates files', function () {
        let examplePath = '-site/src/examples/monster-cookies/Index.jsx';
        if (repositoryName === 'terra-framework' || repositoryName === 'terra-clinical') {
          examplePath = '-monster-cookies/examples/Index.site-page.jsx';
        }

        assert.file([
          `packages/${repository}-monster-cookies/README.md`,
          `packages/${repository}-monster-cookies/CHANGELOG.md`,
          `packages/${repository}${examplePath}`
        ]);
      });

      it('creates the License and Notice files', function () {
        assert.file([
          `packages/${repository}-monster-cookies/LICENSE`,
          `packages/${repository}-monster-cookies/NOTICE`
        ]);
      });

      it('fills the sass file with some dummy sass', function () {
        const scss = `packages/${repository}-monster-cookies/src/MonsterCookies.scss`;

        assert.fileContent(scss, ':local {');
        assert.fileContent(scss, '.monster-cookies {');
      });

      it('fills the docs/README file with title cased project data', function () {
        assert.fileContent(`packages/${repository}-monster-cookies/docs/README.md`, `${title} Monster Cookies`);
      });

      it('fills the package.json file with project data', function () {
        const packageJSON = `packages/${repository}-monster-cookies/package.json`;

        assert.fileContent(packageJSON, `git+https://github.com/cerner/${repositoryName}.git`);
        assert.fileContent(packageJSON, `https://github.com/cerner/${repositoryName}/issues`);
        assert.fileContent(packageJSON, 'wdio ../../wdio.conf.js');
      });

      it('fills the package.json file with the appropriate keywords', function () {
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

      it('fills the README file with project data', function () {
        const readme = `packages/${repository}-monster-cookies/README.md`;

        assert.fileContent(readme, `# ${title} Monster Cookies`);
        assert.fileContent(readme, `img.shields.io/npm/v/${repository}-monster-cookies.svg`);
        assert.fileContent(readme, `travis-ci.org/cerner/${repositoryName}.svg`);
        assert.fileContent(readme, `npm install ${repository}-monster-cookies`);
        assert.fileContent(readme, `[Documentation](https://github.com/cerner/${repositoryName}/tree/master/packages/${repository}-monster-cookies/docs)`);
      });

      it('fills the site examples Index file with project data', function () {
        let index = `packages/${repository}-site/src/examples/monster-cookies/Index.jsx`;
        let fileImportPath = `${repository}-monster-cookies`;
        if (repositoryName === 'terra-framework' || repositoryName === 'terra-clinical') {
          index = `packages/${repository}-monster-cookies/examples/Index.site-page.jsx`;
          fileImportPath = '..';
        }

        assert.fileContent(index, `import React from 'react';`);
        assert.fileContent(index, `import MonsterCookiesSrc from '!raw-loader!${fileImportPath}/src/MonsterCookies';`);
        assert.fileContent(index, `import ReadMe from '${fileImportPath}/docs/README.md';`);
        assert.fileContent(index, `import { version } from '${fileImportPath}/package.json';`);
        assert.fileContent(index, `export default MonsterCookiesExamples;`);
      });

      it('fills the examples Index file with project data', function () {
        const ignore = `packages/${repository}-monster-cookies/.npmignore`;
        assert.fileContent(ignore, `node_modules`);
        assert.fileContent(ignore, `*.log`);

        const npmrc = `packages/${repository}-monster-cookies/.npmrc`;
        assert.fileContent(npmrc, `package-lock=false`);
      });
    });
  });
});
