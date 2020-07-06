<!-- Logo -->
<p align="center">
  <img height="128" width="128" src="https://github.com/cerner/generator-terra-module/raw/main/terra.png">
</p>

<!-- Name -->
<h1 align="center">
  Generator Terra Module
</h1>

[![NPM version](https://badgen.net/npm/v/generator-terra-module)](https://www.npmjs.org/package/generator-terra-module)
[![License](https://badgen.net/github/license/cerner/generator-terra-module)](https://github.com/cerner/generator-terra-module/blob/main/LICENSE)
[![Build Status](https://badgen.net/travis/cerner/generator-terra-module)](https://travis-ci.com/cerner/generator-terra-module)
[![Dependencies status](https://badgen.net/david/dep/cerner/generator-terra-module)](https://david-dm.org/cerner/generator-terra-module)
[![devDependencies status](https://badgen.net/david/dev/cerner/generator-terra-module)](https://david-dm.org/cerner/generator-terra-module?type=dev)

> Quickly scaffold terra modules with this yeoman generator

- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [LICENSE](#license)

# Getting Started

First, install [Yeoman](http://yeoman.io) and generator-terra-module using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-terra-module
```

Then generate your new project:

```bash
npx yo terra-module
```
From here, you will be prompted with two messages:
1. `Terra repository:`
Input `terra-core`, `terra-clinical`, `terra-consumer`, or `terra-framework`. It defaults to `terra-core` if no input is provided.
2. `Your module name:`
Input the desired name of the react component being created. **Note**: the first prompt handles the name space prefixes.

## Generated package
Your new project will be generated in the packages directory of the chosen repository.

Given the module name `button`, the following directory structure would be generated inside of the related monorepos.

```
terra-button
├──docs
│  └── README.md // The component README that appears on the documenation site
├──src
│   ├──terra-dev-site
│   │  ├──doc
│   │  │  ├──Button
│   │  │  │  ├──Button.1.doc.jsx // Doc template that imports all the examples into one page
│   │  │  │  └──ChangeLog.2.doc.jsx // This imports and renders the CHANGELOG.md file
│   │  │  └──example
│   │  │     └──DefaultButton.jsx // Default component example used in doc site
│   │  └──test
│   │     └──button
│   │        └──DefaultButton.test.jsx // Default component example used in wdio testing
│   ├──Button.jsx // Source code for react component
│   └──Button.module.scss // Source code for component styles
├──tests
│   └──jest
│   │  └──DefaultButton.test.jsx // Jest test file
│   └──wdio
│      └──button-spec.js // Webdriver.io test file
├──.npmignore // Contains files we don't want to include in npm package
├──.npmrc // Specifies npm package config
├──CHANGELOG // Contains component change log history
├──LICENSE // License used with component package
├──NOTICE // Notice used with component package
├──package.json // NPM Package metadata
└──README.md // The component README that appears on NPM
```

After generating the project, add your package to the packages listed in the README.md file of the repository you created the project in.

Now you are ready to start building your terra module!

# Updating The Generator

To update the generator to the latest release, run the following command.

```bash
npm install -g generator-terra-module
```

# Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

# LICENSE

Copyright 2016 - 2020 Cerner Innovation, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

&nbsp;&nbsp;&nbsp;&nbsp;http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
