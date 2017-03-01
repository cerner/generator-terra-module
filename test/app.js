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
      'README.md'
    ]);
  });

  it('creates the mixins and variables files', function () {
    assert.file([
      'src/_mixins.scss',
      'src/_variables.scss'
    ]);
  });

  it('fills the sass file with some dummy sass', function () {
    assert.fileContent('src/cake.scss', '@import \'./variables\';');
    assert.fileContent('src/cake.scss', '@import \'./mixins\';');
  });

  it('fills the docs/README file with title cased project data', function () {
    assert.fileContent('docs/README.md', 'Waffle Cake Documentation');
  });

  it('fills the package.json file with project data', function () {
    assert.fileContent('package.json', 'git+https://github.com/cerner/waffle-cake.git');
    assert.fileContent('package.json', 'https://github.com/cerner/waffle-cake/issues');
  });

  it('fills the README file with project data', function () {
    assert.fileContent('README.md', '# Waffle Cake');
    assert.fileContent('README.md', 'img.shields.io/npm/v/waffle-cake.svg');
    assert.fileContent('README.md', 'travis-ci.org/cerner/waffle-cake.svg');
    assert.fileContent('README.md', 'npm install waffle-cake');
    assert.fileContent('README.md', 'https://github.com/cerner/waffle-cake/archive/master.zip');
    assert.fileContent('README.md', 'https://github.com/cerner/waffle-cake.git');
  });
});
