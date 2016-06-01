# construx-browserify

Lead Maintainer: [Matt Edelman](https://github.com/grawk)

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
        "files": "/js/app.js"
    }
}
```

Alternatively, if you have a situation where a request (`/bundle.js`) may actually need to map to some other entry point (`/main.js`), 
you can specify a "bundles" map as below:

```json
{
    "browserify": {
        "module": "construx-browserify",
        "files": "**/*.js",
        "bundles": {
            "/bundle.js": {
                "src": "path:./public/main.js",
                "options": {
                    "transform": ["reactify", "require-globify"]
                }
            }
        }
    }
}
```

IF you specify a "bundles" map, then you **MUST** add an entry for any file you wish to transform.

_Note: See [construx README](https://github.com/krakenjs/construx/blob/master/README.md) for general usage of construx_

