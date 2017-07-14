/*───────────────────────────────────────────────────────────────────────────*\
 │  Copyright (C) 2017 PayPal Software Foundation                                │
 │                                                                             │
 │hh ,'""`.                                                                    │
 │  / _  _ \  Licensed under the Apache License, Version 2.0 (the "License");  │
 │  |(@)(@)|  you may not use this file except in compliance with the License. │
 │  )  __  (  You may obtain a copy of the License at                          │
 │ /,'))((`.\                                                                  │
 │(( ((  )) ))    http://www.apache.org/licenses/LICENSE-2.0                   │
 │ `\ `)(' /'                                                                  │
 │                                                                             │
 │   Unless required by applicable law or agreed to in writing, software       │
 │   distributed under the License is distributed on an "AS IS" BASIS,         │
 │   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
 │   See the License for the specific language governing permissions and       │
 │   limitations under the License.                                            │
 \*───────────────────────────────────────────────────────────────────────────*/
'use strict';
var path = require('path'),
  browserify = require('browserify');

module.exports = function (options) {

    options.ext = options.ext || 'js';
    options.precompile = function (options, cb) {
        options.skipRead = true;
        cb(null, options);
    };
    /**
     * Middleware that will process the request.
     * See https://github.com/krakenjs/construx#middleware-process-a-matched-request
     * @param raw: Raw content of the resource matched by Construx.
     * @param config: Configuration object provided through Construx initialization (Usually found in Kraken's config files)
     * @returns function (err, result): A callback that will take the compiled file.
     */
    return function compiler(raw, config, callback) {

        var ctx = config.context;
        var src = path.join(ctx.srcRoot, ctx.name + '.' + ctx.ext);
        var bOptions = options;
        if (options.bundles) {
            if (!options.bundles.hasOwnProperty(config.context.filePath)) {
                return callback(new Error('construx-browserify doesn\'t know how to process ' + config.context.filePath));
            }
            var opts = options.bundles[config.context.filePath];
            src = opts.src;
            bOptions = opts.options || {};
        }

        browserify(src, bOptions).bundle(function (err, buffer) {
            if (err) {
                return callback(err);
            }
            callback(null, buffer.toString());
        });
    };
};