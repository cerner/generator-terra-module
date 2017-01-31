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

  it('creates the dot files', function () {
    assert.file([
      '.babelrc',
      '.eslintignore',
      '.eslintrc',
      '.gitignore',
      '.nvmrc',
      '.stylelintrc',
      '.travis.yml'
    ]);
  });

  it('creates the github template files', function () {
    assert.file([
      '.github/ISSUE_TEMPLATE.md',
      '.github/PULL_REQUEST_TEMPLATE.md'
    ]);
  });

  it('creates files', function () {
    assert.file([
      'CONTRIBUTING.md',
      'CONTRIBUTORS.md',
      'LICENSE',
      'NOTICE',
      'package.json',
      'README.md',
      'RELEASE.md'
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
    assert.fileContent('src/cake.scss', '.waffle-Cake');
  });

  it('fills the docs/README file with title cased project data', function () {
    assert.fileContent('docs/README.md', 'Waffle Cake Documentation');
  });

  it('fills the CONTRIBUTING file with project data', function () {
    assert.fileContent('CONTRIBUTING.md', 'Browser, and waffle-cake');
    assert.fileContent('CONTRIBUTING.md', 'https://github.com/cerner/waffle-cake/issues');
  });

  it('fills the NOTICE file with project data', function () {
    var currentDate = new Date().getFullYear();
    assert.fileContent('NOTICE', 'Copyright ' + currentDate);
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

  it('fills the RELEASE file with project data', function () {
    assert.fileContent('RELEASE.md', 'https://www.npmjs.com/package/waffle-cake/');
  });
});
