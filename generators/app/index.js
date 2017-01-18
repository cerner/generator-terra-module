'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

/**
 * Converts a string of the form ab bc cd into Ab Bc Cd
 * @param {String} the typically hyphenless project name
 */
function toTitleCase(str) {
  return _.startCase(_.toLower(str));
}

/**
 * Converts a string of the form a-b-c into ABC
 * @param {String} the project name
 */
function toClassName(str) {
  return _.upperFirst(_.camelCase(str));
}

/**
 * Converts a string of the form a-b-c into b-c
 * @param {String} the project name
 */
function namespacelessProjectName(str) {
  var hyphenlessProjectNameArray = str.split("-");
  hyphenlessProjectNameArray.shift();
  return hyphenlessProjectNameArray.join("-");
}

/**
 * Converts a string of the form a-b-c into a-BC
 * @param {String} the project name
 */
function toCssClassName(str) {
  const namespaceless = namespacelessProjectName(str);
  return str.replace(namespaceless, toClassName(namespaceless));
}

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('paramProjectName', {type: String, required: false});

    if (this.paramProjectName === undefined) {
      this.projectName = path.basename(process.cwd());
    } else {
      this.projectName = this.paramProjectName;
    }
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-terra-module') + ' generator! This will scaffold a skeleton to help start developing a terra module!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Your module name:',
      default: this.projectName
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.name;

      this.props.cssClassName = toCssClassName(this.props.projectName);
      this.props.namespacelessProjectClassName = toClassName(namespacelessProjectName(this.props.projectName));
      this.props.projectClassName = toClassName(this.props.projectName);
      this.props.titlecaseProjectName = toTitleCase(this.props.projectName.replace('-', ' '));

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('src/projectName.jsx'),
      this.destinationPath('src/' + this.props.projectClassName + '.jsx'),
      {
        projectName: this.props.projectName,
        projectClassName: this.props.namespacelessProjectClassName,
        projectCssClassName: this.props.cssClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('src/projectName.scss'),
      this.destinationPath('src/' + this.props.projectName + '.scss'),
      {
        projectCssClassName: this.props.cssClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('docs/**/*'),
      this.destinationPath('docs/'),
      {
        projectName: this.props.projectName,
        titlecaseProjectName: this.props.titlecaseProjectName,
        currentYear: new Date().getFullYear()
      }
    );

    this.fs.copyTpl(
      this.templatePath('demos/**/*'),
      this.destinationPath('demos/'),
      {
        namespacelessProjectClassName: this.props.namespacelessProjectClassName,
        projectName: this.props.projectName,
        projectClassName: this.props.projectClassName,
        projectCssClassName: this.props.cssClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('projectNameTest.jsx'),
      this.destinationPath('tests/__tests__/' + this.props.projectClassName + 'Test.jsx'),
      {
        namespacelessProjectClassName: this.props.namespacelessProjectClassName,
        projectClassName: this.props.projectClassName,
        projectCssClassName: this.props.cssClassName
      }
    );

    this.fs.copy(
      this.templatePath('_.babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copy(
      this.templatePath('_.eslintignore'),
      this.destinationPath('.eslintignore')
    );

    this.fs.copy(
      this.templatePath('_.eslintrc'),
      this.destinationPath('.eslintrc')
    );

    this.fs.copy(
      this.templatePath('_.github'),
      this.destinationPath('.github')
    );

    this.fs.copyTpl(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore'),
      {
        projectName: this.props.projectName
      }
    );

    this.fs.copy(
      this.templatePath('_.nvmrc'),
      this.destinationPath('.nvmrc')
    );

    this.fs.copy(
      this.templatePath('_.stylelintrc'),
      this.destinationPath('.stylelintrc')
    );

    this.fs.copy(
      this.templatePath('_.travis.yml'),
      this.destinationPath('.travis.yml')
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        projectName: this.props.projectName,
        titlecaseProjectName: this.props.titlecaseProjectName,
        currentYear: new Date().getFullYear()
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.props.projectName,
        projectClassName: this.props.projectClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {
        projectName: this.props.projectName
      }
    );

    this.fs.copyTpl(
      this.templatePath('CONTRIBUTING.md'),
      this.destinationPath('CONTRIBUTING.md'),
      {
        projectName: this.props.projectName
      }
    );

    this.fs.copy(
      this.templatePath('CONTRIBUTORS.md'),
      this.destinationPath('CONTRIBUTORS.md')
    );

    this.fs.copy(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE')
    );

    this.fs.copyTpl(
      this.templatePath('NOTICE'),
      this.destinationPath('NOTICE'),
      {
        currentYear: new Date().getFullYear()
      }
    );

    this.fs.copyTpl(
      this.templatePath('RELEASE.md'),
      this.destinationPath('RELEASE.md'),
      {
        projectName: this.props.projectName
      }
    );

    this.fs.write(this.destinationPath('src/_mixins.scss'), '');
    this.fs.write(this.destinationPath('src/_variables.scss'), '');

    this.fs.write(this.destinationPath('docs/' + this.props.projectName + '.md'), '# ' + this.props.titlecaseProjectName + '\n\n' +
      ' {insert description}\n\n' +
      '## Getting Started\n\n' +
      '- Install with [npm](https://www.npmjs.com): `npm install ' + this.props.projectName + '`\n' +
      '- [Download the latest version](https://github.com/cerner/' + this.props.projectName + '/archive/master.zip)\n' +
      '- Clone the repo: `git clone https://github.com/cerner/' + this.props.projectName + '.git`\n');
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  }
});
