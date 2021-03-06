const version = require('../package.json').version
const join = require('path').join
const createFileTransformerSync = require('./utility/createFileTransformerSync')
const createJsonTransformer = require('./utility/createJsonTransformer')
const guardedSpawnSync = require('../scripts/utility/guardedSpawnSync')

// Set version number in package.json
createFileTransformerSync(
	createJsonTransformer(
		transformPackage,
		{ sort: true }
	)
)({
	workingDirectoryPath: join(process.cwd(), 'examples'),
	inputFilePath: 'package.json',
	outputFilePath: 'package.json'
})

function transformPackage(input) {
	return Object.keys(input)
	.reduce((output, key) => {
		output[key] = key === 'dependencies'
			? transformDependencies(input[key])
			: input[key]
		return output
	}, {})
}

function transformDependencies(input) {
	return Object.keys(input)
	.reduce((output, key) => {
		output[key] = key === 'function'
			? `^${version}`
			: input[key]
		return output
	}, {})
}

guardedSpawnSync('git', [ 'add', 'package.json' ], {
	cwd: join(process.cwd(), 'examples'),
	stdio: 'inherit'
})
