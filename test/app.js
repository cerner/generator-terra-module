'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-terra-module:app', function () {
  describe('terra-core module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          repository: 'terra-core',
          moduleName: 'waffle-cake',
          curentYear: '1000'
        })
        .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'packages/terra-waffle-cake/README.md',
        'packages/terra-waffle-cake/CHANGELOG.md',
        'packages/terra-site/src/examples/waffle-cake/Index.jsx'
      ]);
    });

    it('creates the mixins and variables files', function () {
      assert.file([
        'packages/terra-waffle-cake/src/_mixins.scss',
        'packages/terra-waffle-cake/src/_variables.scss'
      ]);
    });

    it('creates the License and Notice files', function () {
      assert.file([
        'packages/terra-waffle-cake/LICENSE',
        'packages/terra-waffle-cake/NOTICE'
      ]);
    });

    it('fills the sass file with some dummy sass', function () {
      assert.fileContent('packages/terra-waffle-cake/src/WaffleCake.scss', '@import \'./variables\';');
      assert.fileContent('packages/terra-waffle-cake/src/WaffleCake.scss', '@import \'./mixins\';');
      assert.fileContent('packages/terra-waffle-cake/src/WaffleCake.scss', '.terra-WaffleCake {');
    });

    it('fills the docs/README file with title cased project data', function () {
      assert.fileContent('packages/terra-waffle-cake/docs/README.md', 'Terra Waffle Cake');
    });

    it('fills the package.json file with project data', function () {
      assert.fileContent('packages/terra-waffle-cake/package.json', 'git+https://github.com/cerner/terra-core.git');
      assert.fileContent('packages/terra-waffle-cake/package.json', 'https://github.com/cerner/terra-core/issues');
      assert.fileContent('packages/terra-waffle-cake/package.json', '../../node_modules/terra-toolkit/lib/scripts');
      assert.fileContent('packages/terra-waffle-cake/package.json', `"props-table": "props-table ./src/WaffleCake.jsx --out-dir ./docs/props-table",`);
    });

    it('fills the README file with project data', function () {
      assert.fileContent('packages/terra-waffle-cake/README.md', '# Terra Waffle Cake');
      assert.fileContent('packages/terra-waffle-cake/README.md', 'img.shields.io/npm/v/terra-waffle-cake.svg');
      assert.fileContent('packages/terra-waffle-cake/README.md', 'travis-ci.org/cerner/terra-core.svg');
      assert.fileContent('packages/terra-waffle-cake/README.md', 'npm install terra-waffle-cake');
      assert.fileContent('packages/terra-waffle-cake/README.md', '[Documentation](https://github.com/cerner/terra-core/tree/master/packages/terra-waffle-cake/docs)');
    });

    it('fills the examples Index file with project data', function () {
      assert.fileContent('packages/terra-site/src/examples/waffle-cake/Index.jsx', `import React from 'react';`);
      assert.fileContent('packages/terra-site/src/examples/waffle-cake/Index.jsx', `import WaffleCakeSrc from '!raw-loader!terra-waffle-cake/src/WaffleCake';`);
      assert.fileContent('packages/terra-site/src/examples/waffle-cake/Index.jsx', `import ReadMe from 'terra-waffle-cake/docs/README.md';`);
      assert.fileContent('packages/terra-site/src/examples/waffle-cake/Index.jsx', `import { version } from 'terra-waffle-cake/package.json';`);
      assert.fileContent('packages/terra-site/src/examples/waffle-cake/Index.jsx', `export default WaffleCakeExamples;`);
    });

    it('fills the examples Index file with project data', function () {
      assert.fileContent('packages/terra-waffle-cake/.npmignore', `src`);
      assert.fileContent('packages/terra-waffle-cake/.npmignore', `node_modules`);
      assert.fileContent('packages/terra-waffle-cake/.npmignore', `*.log`);
      assert.fileContent('packages/terra-waffle-cake/.npmignore', `target`);
      assert.fileContent('packages/terra-waffle-cake/.npmignore', `tests`);
      assert.fileContent('packages/terra-waffle-cake/.npmignore', `reports`);
    });
  });

  describe('terra-clinical module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          repository: 'terra-clinical',
          moduleName: 'monster-cookies',
          curentYear: '1000'
        })
        .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'packages/terra-clinical-monster-cookies/README.md',
        'packages/terra-clinical-monster-cookies/CHANGELOG.md',
        'packages/terra-clinical-site/src/examples/monster-cookies/Index.jsx'
      ]);
    });

    it('creates the mixins and variables files', function () {
      assert.file([
        'packages/terra-clinical-monster-cookies/src/_mixins.scss',
        'packages/terra-clinical-monster-cookies/src/_variables.scss'
      ]);
    });

    it('creates the License and Notice files', function () {
      assert.file([
        'packages/terra-clinical-monster-cookies/LICENSE',
        'packages/terra-clinical-monster-cookies/NOTICE'
      ]);
    });

    it('fills the sass file with some dummy sass', function () {
      assert.fileContent('packages/terra-clinical-monster-cookies/src/MonsterCookies.scss', '@import \'./variables\';');
      assert.fileContent('packages/terra-clinical-monster-cookies/src/MonsterCookies.scss', '@import \'./mixins\';');
      assert.fileContent('packages/terra-clinical-monster-cookies/src/MonsterCookies.scss', '.terraClinical-MonsterCookies {');
    });

    it('fills the docs/README file with title cased project data', function () {
      assert.fileContent('packages/terra-clinical-monster-cookies/docs/README.md', 'Terra Clinical Monster Cookies');
    });

    it('fills the package.json file with project data', function () {
      assert.fileContent('packages/terra-clinical-monster-cookies/package.json', 'git+https://github.com/cerner/terra-clinical.git');
      assert.fileContent('packages/terra-clinical-monster-cookies/package.json', 'https://github.com/cerner/terra-clinical/issues');
      assert.fileContent('packages/terra-clinical-monster-cookies/package.json', '../../node_modules/terra-toolkit/lib/scripts');
      assert.fileContent('packages/terra-clinical-monster-cookies/package.json', `"props-table": "$(cd ..; npm bin)/props-table ./src/MonsterCookies.jsx --out-dir ./docs/props-table",`);
    });

    it('fills the README file with project data', function () {
      assert.fileContent('packages/terra-clinical-monster-cookies/README.md', '# Terra Clinical Monster Cookies');
      assert.fileContent('packages/terra-clinical-monster-cookies/README.md', 'img.shields.io/npm/v/terra-clinical-monster-cookies.svg');
      assert.fileContent('packages/terra-clinical-monster-cookies/README.md', 'travis-ci.org/cerner/terra-clinical.svg');
      assert.fileContent('packages/terra-clinical-monster-cookies/README.md', 'npm install terra-clinical-monster-cookies');
      assert.fileContent('packages/terra-clinical-monster-cookies/README.md', '[Documentation](https://github.com/cerner/terra-clinical/tree/master/packages/terra-clinical-monster-cookies/docs)');
    });

    it('fills the examples Index file with project data', function () {
      assert.fileContent('packages/terra-clinical-site/src/examples/monster-cookies/Index.jsx', `import React from 'react';`);
      assert.fileContent('packages/terra-clinical-site/src/examples/monster-cookies/Index.jsx', `import MonsterCookiesSrc from '!raw-loader!terra-clinical-monster-cookies/src/MonsterCookies';`);
      assert.fileContent('packages/terra-clinical-site/src/examples/monster-cookies/Index.jsx', `import ReadMe from 'terra-clinical-monster-cookies/docs/README.md';`);
      assert.fileContent('packages/terra-clinical-site/src/examples/monster-cookies/Index.jsx', `import { version } from 'terra-clinical-monster-cookies/package.json';`);
      assert.fileContent('packages/terra-clinical-site/src/examples/monster-cookies/Index.jsx', `export default MonsterCookiesExamples;`);
    });

    it('fills the examples Index file with project data', function () {
      assert.fileContent('packages/terra-clinical-monster-cookies/.npmignore', `src`);
      assert.fileContent('packages/terra-clinical-monster-cookies/.npmignore', `node_modules`);
      assert.fileContent('packages/terra-clinical-monster-cookies/.npmignore', `*.log`);
    });
  });
});
