/*───────────────────────────────────────────────────────────────────────────*\
 │  Copyright (C) 2015 eBay Software Foundation                                │
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
/*global describe, it, beforeEach, afterEach*/

'use strict';

var fs = require('fs'),
    path = require('path'),
    test = require('tap').test,
    context = {
        name: '/js/app',
        srcRoot: path.resolve(__dirname, 'fixtures/'),
        ext: 'js'
    },
    ConstruxBrowserify = require(path.resolve(__dirname, '..'));

test('construx-browserify', function (t) {

    /**
     * Makes sure that js resources are actually bundled.
     */
    t.test('Correctly bundles javascript files', function (t) {
        t.plan(1);

        //Retrieve app entry point
        fs.readFile(path.resolve(__dirname, 'fixtures/js/app.js'), function (err, data) {
            var construxBrowserify = ConstruxBrowserify({});
            construxBrowserify(data, {paths: '', context: context}, function (err, compiled) {
                var app = eval(compiled)(1); //Eval entry point (app.js)
                t.equal(app(), 'foobar');
                t.end();
            });
        });
    });


    /**
     * Makes sure that the wrapper correctly passes the browserify config object
     */
    t.test('Correctly handles browserify options', function (t) {
        t.plan(1);

        fs.readFile(path.resolve(__dirname, 'fixtures/js/app.js'), function (err, data) {

            var construxBrowserify = ConstruxBrowserify({debug: true}); //Append sourcemap as a test option.

            construxBrowserify(data, {paths: '', context: context}, function (err, compiled) {
                t.ok(~compiled.indexOf('sourceMappingURL')); //Make sure sourcemap is in place
                t.end();
            });
        });
    });

    t.end()
});