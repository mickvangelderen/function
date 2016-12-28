const createFileTransformerSync = require('./utility/createFileTransformerSync')
const createJsonTransformer = require('./utility/createJsonTransformer')
const guardedSpawnSync = require('../scripts/utility/guardedSpawnSync')
const join = require('path').join
const relative = require('path').relative
const resolve = require('path').resolve

const workingDirectoryPath = join(__dirname, '..')
const inputDirectoryPath = workingDirectoryPath
const outputDirectoryPath = join(workingDirectoryPath, 'release')
const copyFileSync = createFileTransformerSync(input => input)

build({
	inputDirectoryPath,
	outputDirectoryPath,
	engines: {
		node: '>=4.0.0'
	}
})

function build({
	inputDirectoryPath,
	outputDirectoryPath,
	engines
}) {
	// Build source files.
	guardedSpawnSync('babel', [
		'*.js',
		'--out-dir', relative(workingDirectoryPath, resolve(workingDirectoryPath, outputDirectoryPath)),
		'--source-maps',
		'--ignore', 'node_modules/',
		'--ignore', 'examples/',
		'--ignore', 'release/',
		'--ignore', 'hooks/',
		'--ignore', 'scripts/'
	], {
		cwd: workingDirectoryPath,
		stdio: 'inherit'
	})

	// Build package.json.
	createFileTransformerSync(
		createJsonTransformer(
			createPackageTransformer({ engines }),
			{ sort: true }
		)
	)({
		workingDirectoryPath,
		inputFilePath: join(inputDirectoryPath, 'package.json'),
		outputFilePath: join(outputDirectoryPath, 'package.json')
	})

	// Build mocha.opts
	createFileTransformerSync(
		input => input.toString().replace('--compilers js:babel-register', '')
	)({
		workingDirectoryPath,
		inputFilePath: join(inputDirectoryPath, 'test/mocha.opts'),
		outputFilePath: join(outputDirectoryPath, 'test/mocha.opts')
	})

	// Build readme.md and .npmignore.
	;[ 'readme.md', '.npmignore' ].forEach(relativeFilePath =>
		copyFileSync({
			workingDirectoryPath,
			inputFilePath: join(inputDirectoryPath, relativeFilePath),
			outputFilePath: join(outputDirectoryPath, relativeFilePath)
		})
	)
}

function createPackageTransformer({ engines }) {
	return function transformPackage(pkg) {
		return Object.keys(pkg)
		.filter(key => !/^(private)$/.test(key))
		.reduce((map, key) => {
			map[key] = key === 'devDependencies'
				? transformDevDependencies(pkg[key])
				: key === 'scripts'
				? transformScripts(pkg[key])
				: pkg[key]
			return map
		}, {
			engines
		})
	}
}

function transformDevDependencies(devDependencies) {
	return Object.keys(devDependencies)
	.filter(key => /^(mocha|must)$/.test(key))
	.reduce((map, key) => {
		map[key] = devDependencies[key]
		return map
	}, {})
}

function transformScripts(scripts) {
		return Object.keys(scripts)
		.filter(key => /^(test|prepublish)$/.test(key))
		.reduce((map, key) => {
			map[key] = scripts[key]
			return map
		}, {})
}
