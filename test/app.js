'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

const titleize = word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

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
      assert.fileContent('packages/terra-waffle-cake/src/WaffleCake.scss', ':local {');
      assert.fileContent('packages/terra-waffle-cake/src/WaffleCake.scss', '.waffleCake {');
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

  ['terra-clinical', 'terra-consumer'].forEach(repository => {
    describe(repository, function () {
      const title = repository.split('-').map(titleize).join(' ');

      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            repository: repository,
            moduleName: 'monster-cookies',
            curentYear: '1000'
          })
          .on('end', done);
      });

      it('creates files', function () {
        assert.file([
          `packages/${repository}-monster-cookies/README.md`,
          `packages/${repository}-monster-cookies/CHANGELOG.md`,
          `packages/${repository}-site/src/examples/monster-cookies/Index.jsx`
        ]);
      });

      it('creates the mixins and variables files', function () {
        assert.file([
          `packages/${repository}-monster-cookies/src/_mixins.scss`,
          `packages/${repository}-monster-cookies/src/_variables.scss`
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
        assert.fileContent(scss, '@import \'./variables\';');
        assert.fileContent(scss, '@import \'./mixins\';');
        assert.fileContent(scss, ':local {');
        assert.fileContent(scss, '.monsterCookies {');
      });

      it('fills the docs/README file with title cased project data', function () {
        assert.fileContent(`packages/${repository}-monster-cookies/docs/README.md`, `${title} Monster Cookies`);
      });

      it('fills the package.json file with project data', function () {
        const packageJSON = `packages/${repository}-monster-cookies/package.json`;
        assert.fileContent(packageJSON, `git+https://github.com/cerner/${repository}.git`);
        assert.fileContent(packageJSON, `https://github.com/cerner/${repository}/issues`);
        assert.fileContent(packageJSON, '../../node_modules/terra-toolkit/lib/scripts');
        assert.fileContent(packageJSON, `"props-table": "$(cd ..; npm bin)/props-table ./src/MonsterCookies.jsx --out-dir ./docs/props-table",`);
      });

      it('fills the README file with project data', function () {
        const readme = `packages/${repository}-monster-cookies/README.md`;
        assert.fileContent(readme, `# ${title} Monster Cookies`);
        assert.fileContent(readme, `img.shields.io/npm/v/${repository}-monster-cookies.svg`);
        assert.fileContent(readme, `travis-ci.org/cerner/${repository}.svg`);
        assert.fileContent(readme, `npm install ${repository}-monster-cookies`);
        assert.fileContent(readme, `[Documentation](https://github.com/cerner/${repository}/tree/master/packages/${repository}-monster-cookies/docs)`);
      });

      it('fills the examples Index file with project data', function () {
        const index = `packages/${repository}-site/src/examples/monster-cookies/Index.jsx`;
        assert.fileContent(index, `import React from 'react';`);
        assert.fileContent(index, `import MonsterCookiesSrc from '!raw-loader!${repository}-monster-cookies/src/MonsterCookies';`);
        assert.fileContent(index, `import ReadMe from '${repository}-monster-cookies/docs/README.md';`);
        assert.fileContent(index, `import { version } from '${repository}-monster-cookies/package.json';`);
        assert.fileContent(index, `export default MonsterCookiesExamples;`);
      });

      it('fills the examples Index file with project data', function () {
        const ignore = `packages/${repository}-monster-cookies/.npmignore`;
        assert.fileContent(ignore, `src`);
        assert.fileContent(ignore, `node_modules`);
        assert.fileContent(ignore, `*.log`);
      });
    });
  });
});
