'use strict';
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

    this.projectName = this.paramProjectName;
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
      default: this.projectName,
      validate: function (input) {
        return input !== undefined && input.length !== 0;
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.name;

      this.props.cssClassName = toCssClassName(this.props.projectName);
      this.props.namespacelessProjectName = namespacelessProjectName(this.props.projectName);
      this.props.namespacelessProjectClassName = toClassName(namespacelessProjectName(this.props.projectName));
      this.props.projectClassName = toClassName(this.props.projectName);
      this.props.titlecaseProjectName = toTitleCase(this.props.projectName.replace('-', ' '));
      this.props.jsxFileName = toClassName(namespacelessProjectName(this.props.projectName));
      this.props.scssFileName = this.props.jsxFileName;
      this.props.baseDirectory = 'packages/' + this.props.projectName + '/';
      this.props.currentYear = new Date().getFullYear();

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('src/projectName.jsx'),
      this.destinationPath(this.props.baseDirectory + 'src/' + this.props.jsxFileName + '.jsx'),
      {
        scssFileName: this.props.scssFileName,
        projectClassName: this.props.namespacelessProjectClassName,
        projectCssClassName: this.props.cssClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('src/projectName.scss'),
      this.destinationPath(this.props.baseDirectory + 'src/' + this.props.scssFileName + '.scss'),
      {
        projectCssClassName: this.props.cssClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('projectNameTest.jsx'),
      this.destinationPath(this.props.baseDirectory + 'tests/jest/' + this.props.jsxFileName + '.test.jsx'),
      {
        namespacelessProjectClassName: this.props.namespacelessProjectClassName,
        projectClassName: this.props.projectClassName,
        projectCssClassName: this.props.cssClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('tests/**/*'),
      this.destinationPath(this.props.baseDirectory + 'tests/')
    );

    this.fs.copyTpl(
      this.templatePath('projectName-spec.js'),
      this.destinationPath(this.props.baseDirectory + 'tests/nightwatch/' + this.props.namespacelessProjectName + '-spec.js'),
      {
        projectName: this.props.projectName,
        namespacelessProjectName: this.props.namespacelessProjectName,
        projectCssClassName: this.props.cssClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('projectNameTestRoutes.jsx'),
      this.destinationPath(this.props.baseDirectory + 'tests/nightwatch/' + this.props.namespacelessProjectClassName + 'TestRoutes.jsx'),
      {
        namespacelessProjectName: this.props.namespacelessProjectName,
        namespacelessProjectClassName: this.props.namespacelessProjectClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('projectNameTests.jsx'),
      this.destinationPath(this.props.baseDirectory + 'tests/nightwatch/' + this.props.namespacelessProjectClassName + 'Tests.jsx'),
      {
        namespacelessProjectName: this.props.namespacelessProjectName,
        namespacelessProjectClassName: this.props.namespacelessProjectClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('DefaultProjectName.jsx'),
      this.destinationPath(this.props.baseDirectory + 'tests/nightwatch/Default' + this.props.namespacelessProjectClassName + '.jsx'),
      {
        namespacelessProjectClassName: this.props.namespacelessProjectClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('docs/**/*'),
      this.destinationPath(this.props.baseDirectory + 'docs/'),
      {
        projectName: this.props.projectName,
        projectClassName: this.props.namespacelessProjectClassName,
        titlecaseProjectName: this.props.titlecaseProjectName,
        currentYear: this.props.currentYear
      }
    );

    this.fs.copyTpl(
      this.templatePath('examples/**/*'),
      this.destinationPath('packages/terra-site/src/examples/' + this.props.namespacelessProjectName),
      {
        projectClassName: this.props.namespacelessProjectClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(this.props.baseDirectory + 'README.md'),
      {
        projectName: this.props.projectName,
        titlecaseProjectName: this.props.titlecaseProjectName,
        currentYear: this.props.currentYear
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(this.props.baseDirectory + 'package.json'),
      {
        projectName: this.props.projectName,
        jsxFileName: this.props.jsxFileName
      }
    );

    this.fs.copy(
      this.templatePath('LICENSE'),
      this.destinationPath(this.props.baseDirectory + 'LICENSE')
    );

    this.fs.copyTpl(
      this.templatePath('NOTICE'),
      this.destinationPath(this.props.baseDirectory + 'NOTICE'),
      {
        currentYear: this.props.currentYear
      }
    );

    this.fs.write(this.destinationPath(this.props.baseDirectory + 'src/_mixins.scss'), '');
    this.fs.write(this.destinationPath(this.props.baseDirectory + 'src/_variables.scss'), '');
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  }
});
