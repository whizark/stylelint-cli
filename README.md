# stylelint-cli

[![npm][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

Global CLI wrapper to execute a local [stylelint][stylelint-io] [:octocat:][stylelint-github].


## Installation

First, uninstall global `stylelint` if you have ever installed
`stylelint` as a global package.

```sh
npm uninstall -g stylelint
```

Then, install `stylelint-cli` as a global package.

```sh
npm install -g stylelint-cli
```

## Usage

You should install `stylelint` as a local package in your package
directory.

```sh
npm install --save-dev stylelint
```

Now, you can run your local `stylelint` by global `stylelint-cli`.

```sh
stylelint style.css
```

For more detail, see also [the official stylelint documentation][stylelint-io] [:octocat:][stylelint-github].

[stylelint-io]: http://stylelint.io
[stylelint-github]: https://github.com/stylelint/stylelint

[npm-image]: https://img.shields.io/npm/v/stylelint-cli.svg
[npm-url]: https://www.npmjs.com/stylelint-cli

[travis-image]: https://travis-ci.org/whizark/stylelint-cli.svg?branch=master
[travis-url]: https://travis-ci.org/whizark/stylelint-cli
