'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

const keywords = {
  'terra-core': null,
  'terra-clinical': '\"Clinical\",\n    ',
  'terra-consumer': '\"Consumer\",\n    \"\HealtheLife\",\n    ',
  'terra-framework': '\"Framework\",\n    '
};

/**
 * Converts a string of the form ab bc cd into Ab Bc Cd
 * @param {String} the project name
 */
function toTitleCase(str) {
  return _.startCase(_.toLower(str));
}

/**
 * Converts a string of the form a-b-c into ABC
 * @param {String} the project name or module name
 */
function toClassName(str) {
  return _.upperFirst(_.camelCase(str));
}

/**
 * Concatinates strings a and b into the form a-b
 * @param str1 {String} the repository name
 * @param str2 {String} the module name
 */
function toProjectName(str1, str2) {
  return str1 + '-' + str2;
}

/**
 * Returns the repository prefix
 * @param {String} the repository name
 */
function repositoryPrefix(repo) {
  return (repo === 'terra-core' || repo === 'terra-framework') ? 'terra' : repo;
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
      name: 'repository',
      message: 'Terra repository:',
      default: 'terra-core',
      validate: function (input) {
        var validRepos = ['terra-core', 'terra-clinical', 'terra-consumer', 'terra-framework'];
        return input !== undefined && validRepos.includes(input);
      }
    }, {
      type: 'input',
      name: 'moduleName',
      message: 'Your module name:',
      default: this.moduleName,
      validate: function (input) {
        return input !== undefined && input.length !== 0;
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props."name";
      this.props.repoPrefix = repositoryPrefix(this.props.repository);
      this.props.moduleClassName = toClassName(this.props.moduleName);

      this.props.projectName = toProjectName(this.props.repoPrefix, this.props.moduleName);
      this.props.projectClassName = toClassName(this.props.projectName);
      this.props.titlecaseProjectName = toTitleCase(this.props.projectName.replace('-', ' '));

      this.props.cssClassName = this.props.moduleName;

      this.props.baseDirectory = 'packages/' + this.props.projectName + '/';
      this.props.jsxFileName = toClassName(this.props.moduleName);
      this.props.scssFileName = this.props.jsxFileName;

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
        moduleClassName: this.props.moduleClassName,
        cssClassName: this.props.cssClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('src/projectName.scss'),
      this.destinationPath(this.props.baseDirectory + 'src/' + this.props.scssFileName + '.scss'),
      {
        cssClassName: this.props.cssClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('projectNameTest.jsx'),
      this.destinationPath(this.props.baseDirectory + 'tests/jest/' + this.props.jsxFileName + '.test.jsx'),
      {
        moduleClassName: this.props.moduleClassName,
        cssClassName: this.props.cssClassName
      }
    );

    this.fs.copyTpl(
      this.templatePath('moduleName-spec.js'),
      this.destinationPath(this.props.baseDirectory + 'tests/wdio/' + this.props.moduleName + '-spec.js'),
      {
        moduleName: this.props.moduleName,
        moduleClassName: this.props.moduleClassName,
        rootPath: this.props.repository === 'terra-framework' ? 'raw/tests' : 'tests'
      }
    );

    if (this.props.repository === 'terra-framework' || this.props.repository === 'terra-clinical') {
      const examplesPaths = ['examples/index-examples/Default', 'examples/test-examples/Default'];
      examplesPaths.map(outputPath => (
        this.fs.copyTpl(
          this.templatePath('DefaultProjectName.jsx'),
          this.destinationPath(this.props.baseDirectory + outputPath + this.props.moduleClassName + '.jsx'),
          {
            moduleClassName: this.props.moduleClassName
          }
        )
      ));
    } else {
      this.fs.copyTpl(
        this.templatePath('projectNameTestRoutes.jsx'),
        this.destinationPath(this.props.baseDirectory + 'tests/nightwatch/' + this.props.moduleClassName + 'TestRoutes.jsx'),
        {
          moduleName: this.props.moduleName,
          moduleClassName: this.props.moduleClassName
        }
      );

      this.fs.copyTpl(
        this.templatePath('projectNameTests.jsx'),
        this.destinationPath(this.props.baseDirectory + 'tests/nightwatch/' + this.props.moduleClassName + 'Tests.jsx'),
        {
          moduleName: this.props.moduleName,
          moduleClassName: this.props.moduleClassName
        }
      );

      this.fs.copyTpl(
        this.templatePath('DefaultProjectName.jsx'),
        this.destinationPath(this.props.baseDirectory + 'tests/nightwatch/Default' + this.props.moduleClassName + '.jsx'),
        {
          moduleClassName: this.props.moduleClassName
        }
      );
    }

    this.fs.copyTpl(
      this.templatePath('docs/*'),
      this.destinationPath(this.props.baseDirectory + 'docs/'),
      {
        projectName: this.props.projectName,
        projectClassName: this.props.moduleClassName,
        titlecaseProjectName: this.props.titlecaseProjectName
      }
    );

    if (this.props.repository === 'terra-framework' || this.props.repository === 'terra-clinical') {
      this.fs.copyTpl(
        this.templatePath('Index.jsx'),
        this.destinationPath(this.props.baseDirectory + '/examples/Index.site-page.jsx'),
        {
          importPath: 'index-examples/',
          srcPath: '..',
          projectClassName: this.props.moduleClassName
        }
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('Index.jsx'),
        this.destinationPath('packages/' + this.props.repoPrefix + '-site/src/examples/' + this.props.moduleName + '/Index.jsx'),
        {
          importPath: '',
          srcPath: this.props.projectName,
          projectClassName: this.props.moduleClassName
        }
      );
    }

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(this.props.baseDirectory + 'README.md'),
      {
        projectName: this.props.projectName,
        titlecaseProjectName: this.props.titlecaseProjectName,
        currentYear: this.props.currentYear,
        repository: this.props.repository
      }
    );

    this.fs.copyTpl(
      this.templatePath('CHANGELOG.md'),
      this.destinationPath(this.props.baseDirectory + 'CHANGELOG.md')
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(this.props.baseDirectory + 'package.json'),
      {
        repository: this.props.repository,
        projectName: this.props.projectName,
        jsxFileName: this.props.jsxFileName,
        keywords: keywords[this.props.repository]
      }
    );

    this.fs.copy(
      this.templatePath('LICENSE'),
      this.destinationPath(this.props.baseDirectory + 'LICENSE'),
      {
        currentYear: this.props.currentYear
      }
    );

    this.fs.copyTpl(
      this.templatePath('NOTICE'),
      this.destinationPath(this.props.baseDirectory + 'NOTICE'),
      {
        currentYear: this.props.currentYear
      }
    );

    this.fs.copyTpl(
      this.templatePath('_.npmignore'),
      this.destinationPath(this.props.baseDirectory + '.npmignore')
    );

    this.fs.copyTpl(
      this.templatePath('_.npmrc'),
      this.destinationPath(this.props.baseDirectory + '.npmrc')
    );
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  }
});
