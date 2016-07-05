#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_modules --harmony_regexp_property "$0" "$@"
'use strict';

const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const pkg = require('../package.json');

const MODULE_NAME = pkg.name;

const bundles = [
	// ES6 for rollup
	{
		format: 'es6', ext: '.es6.js', plugins: [],
		babelPresets: ['stage-1'], babelPlugins: []
	},
	// "current" version
	{
		format: 'cjs', ext: '.node6.js', plugins: [],
		babelPresets: ['es2015-node6'], babelPlugins: []
	},
	// "stable" version
	{
		format: 'cjs', ext: '.node4.js', plugins: [],
		babelPresets: ['es2015-node4'], babelPlugins: []
	},
	// all < stable
	{
		format: 'cjs', ext: '.node-legacy.js', plugins: [],
		babelPresets: ['es2015'], babelPlugins: []
	},
	{
		format: 'cjs', ext: '.browser.js', plugins: [],
		babelPresets: ['es2015-rollup', 'stage-1'], babelPlugins: []
	},
	{
		format: 'umd', ext: '.umd.js', plugins: [],
		babelPresets: ['es2015-rollup', 'stage-1'], babelPlugins: [],
		moduleName: MODULE_NAME
	},
	{
		format: 'umd', ext: '.umd.min.js', plugins: [uglify()],
		babelPresets: ['es2015-rollup', 'stage-1'], babelPlugins: [],
		moduleName: MODULE_NAME, minify: true
	}
];

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*']));

// Compile source code into a distributable format with Babel and Rollup
for (const config of bundles) {
	promise = promise.then(() => rollup.rollup({
		entry: 'src/index.js',
		external: Object.keys(pkg.dependencies),
		plugins: [
			babel({
				babelrc: false,
				exclude: 'node_modules/**',
				presets: config.babelPresets,
				plugins: config.babelPlugins,
			})
		].concat(config.plugins),
	}).then(bundle => bundle.write({
		dest: `dist/${config.moduleName || 'index'}${config.ext}`,
		format: config.format,
		sourceMap: !config.minify,
		moduleName: config.moduleName,
	})));
}

// Copy package.json and LICENSE.txt
promise = promise.then(() => {
	delete pkg.private;
	delete pkg.devDependencies;
	delete pkg.scripts;
	delete pkg.eslintConfig;
	delete pkg.babel;
	fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
	fs.writeFileSync('dist/LICENSE', fs.readFileSync('LICENSE', 'utf-8'), 'utf-8');
});

promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console
