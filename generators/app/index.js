
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const startCase = require('lodash.startcase');
const upperFirst = require('lodash.upperfirst');
const camelCase = require('lodash.camelcase');

const keywords = {
  'terra-core': null,
  'terra-clinical': '"Clinical",\n    ',
  'terra-consumer': '"Consumer",\n    "HealtheLife",\n    ',
  'terra-framework': '"Framework",\n    ',
};

/**
 * Converts a string of the form ab bc cd into Ab Bc Cd
 * @param {String} the project name
 */
function toTitleCase(str) {
  return startCase(str.toLowerCase());
}

/**
 * Converts a string of the form a-b-c into ABC
 * @param {String} the project name or module name
 */
function toClassName(str) {
  return upperFirst(camelCase(str));
}

/**
 * Concatinates strings a and b into the form a-b
 * @param str1 {String} the repository name
 * @param str2 {String} the module name
 */
function toProjectName(str1, str2) {
  return `${str1}-${str2}`;
}

/**
 * Returns the repository prefix
 * @param {String} the repository name
 */
function repositoryPrefix(repo) {
  return (repo === 'terra-core' || repo === 'terra-framework') ? 'terra' : repo;
}

/**
 * Returns the repository namespace
 * @param {String} the repository name
 */
function repositoryNamespace(repo) {
  return (repo === 'terra-core' || repo === 'terra-framework') ? '' : `${repo.replace('terra-', '')}-`;
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('paramProjectName', { type: String, required: false });
    this.projectName = this.options.paramProjectName;
  }

  prompting() {
    this.log(yosay(
      `Welcome to the ${chalk.red('generator-terra-module')} generator! This will scaffold a skeleton to help start developing a terra module!`,
    ));

    const prompts = [{
      type: 'input',
      name: 'repository',
      message: 'Terra repository:',
      default: 'terra-core',
      validate(input) {
        const validRepos = ['terra-core', 'terra-clinical', 'terra-consumer', 'terra-framework'];
        return input !== undefined && validRepos.includes(input);
      },
    }, {
      type: 'input',
      name: 'moduleName',
      message: 'Your module name:',
      default: this.moduleName,
      validate(input) {
        return input !== undefined && input.length !== 0;
      },
    }];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.repoPrefix = repositoryPrefix(this.props.repository);
      this.props.repoNamespace = repositoryNamespace(this.props.repository);
      this.props.moduleClassName = toClassName(this.props.moduleName);

      this.props.projectName = toProjectName(this.props.repoPrefix, this.props.moduleName);
      this.props.projectClassName = toClassName(this.props.projectName);
      this.props.titlecaseProjectName = toTitleCase(this.props.projectName.replace('-', ' '));

      this.props.cssClassName = this.props.moduleName;

      this.props.baseDirectory = `packages/${this.props.projectName}/`;
      this.props.jsxFileName = toClassName(this.props.moduleName);
      this.props.scssFileName = this.props.jsxFileName;

      this.props.currentYear = new Date().getFullYear();
    });
  }

  writing() {
    // Add Component JSX File
    this.fs.copyTpl(
      this.templatePath('src/projectName.jsx'),
      this.destinationPath(`${this.props.baseDirectory}src/${this.props.jsxFileName}.jsx`),
      {
        cssClassName: this.props.cssClassName,
        moduleClassName: this.props.moduleClassName,
        scssFileName: this.props.scssFileName,
      },
    );

    // Add Component SCSS File
    this.fs.copyTpl(
      this.templatePath('src/projectName.module.scss'),
      this.destinationPath(`${this.props.baseDirectory}src/${this.props.scssFileName}.module.scss`),
      {
        cssClassName: this.props.cssClassName,
      },
    );

    // Add Docs
    this.fs.copyTpl(
      this.templatePath('docs/*'),
      this.destinationPath(`${this.props.baseDirectory}docs/`),
      {
        projectName: this.props.projectName,
        projectClassName: this.props.moduleClassName,
        titlecaseProjectName: this.props.titlecaseProjectName,
      },
    );

    // Add Jest Test File
    this.fs.copyTpl(
      this.templatePath('tests/projectNameTest.jsx'),
      this.destinationPath(`${this.props.baseDirectory}tests/jest/${this.props.jsxFileName}.test.jsx`),
      {
        moduleClassName: this.props.moduleClassName,
        cssClassName: this.props.cssClassName,
      },
    );

    // Add Wdio Spec File
    this.fs.copyTpl(
      this.templatePath('tests/moduleName-spec.js'),
      this.destinationPath(`${this.props.baseDirectory}tests/wdio/${this.props.moduleName}-spec.js`),
      {
        moduleName: this.props.moduleName,
        moduleClassName: this.props.moduleClassName,
        projectName: this.props.projectName,
      },
    );

    // Add Doc Index
    this.fs.copyTpl(
      this.templatePath('src/terra-dev-site/Index.jsx'),
      this.destinationPath(`${this.props.baseDirectory}src/terra-dev-site/doc/${this.props.moduleClassName}/${this.props.moduleClassName}.1.doc.jsx`),
      {
        projectClassName: this.props.moduleClassName,
        repository: this.props.repository,
      },
    );

    // Add Doc ChangeLog
    this.fs.copyTpl(
      this.templatePath('src/terra-dev-site/ChangeLog.jsx'),
      this.destinationPath(`${this.props.baseDirectory}src/terra-dev-site/doc/${this.props.moduleClassName}/ChangeLog.2.doc.jsx`),
      {
        projectClassName: this.props.moduleName,
        repository: this.props.repository,
      },
    );

    // Add Default Doc Example
    this.fs.copyTpl(
      this.templatePath('src/terra-dev-site/DefaultDocExample.jsx'),
      this.destinationPath(`${this.props.baseDirectory}src/terra-dev-site/doc/example/Default${this.props.moduleClassName}.jsx`),
      {
        moduleClassName: this.props.moduleClassName,
        projectName: this.props.projectName,
      },
    );

    // Add Default Test Example
    const testFolder = `${this.props.repoNamespace}${this.props.moduleName}`;
    this.fs.copyTpl(
      this.templatePath('src/terra-dev-site/DefaultProjectName.jsx'),
      this.destinationPath(`${this.props.baseDirectory}src/terra-dev-site/test/${testFolder}/Default${this.props.moduleClassName}.test.jsx`),
      {
        moduleClassName: this.props.moduleClassName,
      },
    );

    // Add Package Readme
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(`${this.props.baseDirectory}README.md`),
      {
        projectName: this.props.projectName,
        titlecaseProjectName: this.props.titlecaseProjectName,
        currentYear: this.props.currentYear,
        repository: this.props.repository,
      },
    );

    // Add Changelog
    this.fs.copyTpl(
      this.templatePath('CHANGELOG.md'),
      this.destinationPath(`${this.props.baseDirectory}CHANGELOG.md`),
    );

    // Add package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(`${this.props.baseDirectory}package.json`),
      {
        repository: this.props.repository,
        projectName: this.props.projectName,
        jsxFileName: this.props.jsxFileName,
        keywords: keywords[this.props.repository],
      },
    );

    // Add LICENSE
    this.fs.copy(
      this.templatePath('LICENSE'),
      this.destinationPath(`${this.props.baseDirectory}LICENSE`),
      {
        currentYear: this.props.currentYear,
      },
    );

    // Add NOTICE
    this.fs.copyTpl(
      this.templatePath('NOTICE'),
      this.destinationPath(`${this.props.baseDirectory}NOTICE`),
      {
        currentYear: this.props.currentYear,
      },
    );

    // Add npmignore file
    this.fs.copyTpl(
      this.templatePath('_.npmignore'),
      this.destinationPath(`${this.props.baseDirectory}.npmignore`),
    );

    // Add npmrc file
    this.fs.copyTpl(
      this.templatePath('_.npmrc'),
      this.destinationPath(`${this.props.baseDirectory}.npmrc`),
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
