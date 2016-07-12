#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

const _ = require('lodash')
const fs = require('fs-extra')
const rollup = require('rollup')
const rollup_babel = require('rollup-plugin-babel')
const rollup_uglify = require('rollup-plugin-uglify')

const tsc = require('./node-tsc')
const pkg = require('../package.json')
const tsconfig = require('../tsconfig.json')

const MODULE_NAME = pkg.name;

console.log(`* Building module ${MODULE_NAME}...`)

const bundles = [
	// ES6 for rollup and its "jsnext:main" package.json property
	/*{
		format: 'es6', ext: '.js', plugins: [],
		babelPresets: ['stage-1'], babelPlugins: []
	},*/
	// node "stable" version
	{
		format: 'cjs', ext: '.node-stable.js', plugins: [],
		babelPresets: ['es2015-node-rollup'], babelPlugins: []
	},
	// all < stable
	{
		format: 'cjs', ext: '.node-legacy.js', plugins: [],
		babelPresets: ['es2015-rollup'], babelPlugins: []
	},
	// other
	{
		format: 'umd', ext: '.umd.js', plugins: [],
		babelPresets: ['es2015-rollup', 'stage-1'], babelPlugins: [],
		moduleName: MODULE_NAME
	},
	{
		format: 'umd', ext: '.umd.min.js', plugins: [rollup_uglify()],
		babelPresets: ['es2015-rollup', 'stage-1'], babelPlugins: [],
		moduleName: MODULE_NAME, minify: true
	}
];




Promise.resolve()
/*.then(() => {
	// Clean up the output directory
	fs.emptyDirSync('dist')
})
.then(transpile_typescript_to_es2015)
.then(transpile_typescript_to_es2015_amd)*/
.then(transpile_es2015_to_bundles)
.then(() => console.log('SUCCESS'), console.error)
.then(() => {
	process.exit(1)
})

function transpile_typescript_to_es2015() {
	return tsc.compile(
		tsconfig.files,
		tsconfig.compilerOptions
	)
}

function transpile_typescript_to_es2015_amd() {
	return tsc.compile(
		tsconfig.files,
		Object.assign({}, tsconfig.compilerOptions, {
			'declaration': false,
			'outDir': 'dist/src.es2015.amd',
			'module': 'amd'
		})
	)
}

function transpile_es2015_to_bundles() {
	// Compile source code into a distributable format with Babel and Rollup
	const allBundles = bundles.map(config => {
		return rollup.rollup({
			entry: 'dist/src.es2015/index.js',
			external: Object.keys(pkg.dependencies),
			plugins: [
				rollup_babel({
					babelrc: false,
					exclude: 'node_modules/**',
					presets: config.babelPresets,
					plugins: config.babelPlugins,
				})
			].concat(config.plugins),
		})
			.then(bundle => bundle.write({
				dest: `dist/${config.moduleName || 'index'}${config.ext}`,
				format: config.format,
				sourceMap: !config.minify,
				moduleName: config.moduleName,
			}))
	})
	return Promise.all(allBundles)
}


/*
let promise = Promise.resolve();

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
*/
