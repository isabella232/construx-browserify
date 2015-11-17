# construx-browserify

Lead Maintainer: @lmarkus

[![Build Status](https://travis-ci.org/lmarkus/construx-browserify.svg?branch=master)](https://travis-ci.org/lmarkus/construx-browserify)
[![NPM version](https://badge.fury.io/js/construx-browserify.png)](http://badge.fury.io/js/construx-browserify)

[construx](https://github.com/krakenjs/construx) plugin for JIT-compiling javascript browserified resources during development of [express](http://expressjs.com/) applications.

## Requirements

This plugin requires your project to have `<whatever module>@<whatever semver>`.

## Usage

### Install

```shell
$ npm install --save-dev construx-browserify
```

### Configure

Where you configure your construx plugins:

```json
{
    "browserify": {
        "module": "construx-browserify",
        "files": "/js/app.js",
    }
}
```

_Note: See [construx README](https://github.com/krakenjs/construx/blob/master/README.md) for general usage of construx_

