'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-terra-module:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName: 'waffle-cake',
        curentYear: '1000'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'packages/waffle-cake/README.md'
    ]);
  });

  it('creates the mixins and variables files', function () {
    assert.file([
      'packages/waffle-cake/src/_mixins.scss',
      'packages/waffle-cake/src/_variables.scss'
    ]);
  });

  it('fills the sass file with some dummy sass', function () {
    assert.fileContent('packages/waffle-cake/src/Cake.scss', '@import \'./variables\';');
    assert.fileContent('packages/waffle-cake/src/Cake.scss', '@import \'./mixins\';');
  });

  it('fills the docs/README file with title cased project data', function () {
    assert.fileContent('packages/waffle-cake/docs/README.md', 'Waffle Cake');
  });

  it('fills the package.json file with project data', function () {
    assert.fileContent('packages/waffle-cake/package.json', 'git+https://github.com/cerner/terra-ui.git');
    assert.fileContent('packages/waffle-cake/package.json', 'https://github.com/cerner/terra-ui/issues');
  });

  it('fills the README file with project data', function () {
    assert.fileContent('packages/waffle-cake/README.md', '# Waffle Cake');
    assert.fileContent('packages/waffle-cake/README.md', 'img.shields.io/npm/v/waffle-cake.svg');
    assert.fileContent('packages/waffle-cake/README.md', 'travis-ci.org/cerner/terra-ui.svg');
    assert.fileContent('packages/waffle-cake/README.md', 'npm install waffle-cake');
    assert.fileContent('packages/waffle-cake/README.md', '[Documentation](https://github.com/cerner/terra-ui/tree/master/packages/waffle-cake/docs)');
  });
});
