# Generator Terra Module

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
yo terra-module
```
From here, you will be prompted with two messages:
1. `Terra repository:`
Input `terra-core` or `terra-clinical`. It defaults to `terra-core` if no input is provided.
2. `Your module name:`
Input the desired name of the react component being created. **Note**: the first prompt handles the name space prefixes.

Your new project will be generated in the packages directory of the chosen repository.

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

Copyright 2017 Cerner Innovation, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

&nbsp;&nbsp;&nbsp;&nbsp;http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
