const createFileTransformerSync = require('./utility/createFileTransformerSync')
const createJsonTransformer = require('./utility/createJsonTransformer')
const glob = require('glob')
const sortObject = require('sort-object-circular').default
const sortLines = require('./utility/sortLines')
const join = require('path').join

const workingDirectoryPath = join(__dirname, '..')

const jsonResults = glob.sync('**/{.babelrc,*.json}', {
	cwd: workingDirectoryPath,
	ignore: [
		'**/node_modules/**',
		'release/**'
	]
}).map(filePath => {
	return createFileTransformerSync(
		createJsonTransformer(sortObject)
	)({
		workingDirectoryPath,
		inputFilePath: filePath,
		outputFilePath: filePath
	})
})

const linesResults = glob.sync('**/{.eslintignore,.gitignore,.npmignore}', {
	cwd: workingDirectoryPath,
	ignore: [
		'**/node_modules/**',
		'release/**'
	]
}).map(filePath => {
	return createFileTransformerSync(
		buffer => sortLines(buffer.toString())
	)({
		workingDirectoryPath,
		inputFilePath: filePath,
		outputFilePath: filePath
	})
})

module.exports = [ ...jsonResults, ...linesResults ]
