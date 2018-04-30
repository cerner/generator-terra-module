Changelog
=========

Unreleased
------------------
### Changed
* NPM ignore snapshots folders in test folder

1.7.0 - (Mar 6, 2018)
------------------
# Update to use React 16 dependencies

1.6.0 - (Feb 15, 2018)
------------------
### Added
* Update template files for new repo file structure

### Changes
* Replace nightwatch template & script with webdriver.io template & script
* Update `.npmignore` file


1.5.0 - (Jan 17, 2018)
------------------
### Changed
* Fixed lint error in generated code.

1.4.0 - (Jan 16, 2018)
------------------
### Changed
* terra-framework packages now match terra core in that they generate the prefix 'terra-' instead of 'terra-framework-'
* Updated readme to include terra-framework

1.3.0 - (Jan 14, 2018)
------------------
### Added
* Terra-framework support

### Changed
* Removed `src` and `tests` from `.npmignore` file. These will now be included in the npm package.
* Updated the release doc.

1.2.0 - (Oct 31, 2017)
------------------
### Changed
* Update package templates for Jest v21.0.2 in terra repos
* Update nightwatch test templates
* Update test scripts in package templates
* Add .npmrc template
* Update package scripts for windows https://github.com/cerner/terra-core/issues/217
* Remove 'selector-class-pattern' rule from sass template https://github.com/cerner/terra-core/issues/812 & https://github.com/cerner/terra-clinical/issues/193
* Remove `_variables.scss` & `_mixins.scss` file creation. Most packages no longer use these files.

1.1.0 - (Aug 8, 2017)
------------------
### Added
* Changelog template
* Terra-consumer support

### Changed
* Set initial package version as v1.0.0 in package templates
* Update nightwatch scripts in package templates
* Remove terra-mixins from scss template

### Removed
* Nightwatch configuration templates

1.0.4 - (June 26, 2017)
------------------
### Added
* PropsTable scripts in package templates

### Changed
* Include Component-Features in README.md template

1.0.3 - (June 20, 2017)
------------------
### Added
* terra-clinical nightwatch configuration template

### Changed
* Lower react and react-dom dependencies from v15.5.4 to v15.4.2 in package templates
* Update nightwatch scripts in terra-clinical package template

1.0.2 - (June 7, 2017)
------------------
### Changed
* Remove terra-toolkit devDependencies in package templates
* Update .npmignore template

1.0.1 - (May 25, 2017)
------------------
### Changed
* Update README.md

1.0.0 - (May 25, 2017)
------------------
Initial stable release
