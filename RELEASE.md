# How to Release

This project is hosted on NPM.  You can see it [here][project-url].
This project uses [semantic-versioning][semver] to manage versions.

Below is a guide for releasing:
- Checkout the master branch and run `git pull` to ensure you have the latest changes in master.
- Be sure to check the changelog and ensure it has been updated accordingly.
- Verify that the version number in the package.json is correct.
  - Confirm that the version matches the latest released version. The publish script will update the version.
- Login to npm on the command line.
- Run one of the following npm release scripts.

```
"release:major"
"release:minor"
"release:patch"
```

When run, these commands do the following:
- Runs tests.
- Runs [gulp-nsp](https://github.com/nodesecurity/gulp-nsp) to check for known security vulnerabilities in dependent packages.
- Bumps the version number in the package.json file according to the release command that has been run via [npm version](https://docs.npmjs.com/cli/version) command.
- Publishes the release to npm via [npm publish](https://docs.npmjs.com/cli/publish) command.
- Creates a new git commit/tag in the process of publishing to npm.

[project-url]: https://www.npmjs.com/package/generator-terra-module
[semver]: http://semver.org/
