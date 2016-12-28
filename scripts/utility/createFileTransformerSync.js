const resolve = require('path').resolve
const dirname = require('path').dirname
const readFileSync = require('fs').readFileSync
const statSync = require('fs').statSync
const writeFileSync = require('fs').writeFileSync
const mkdirSync = require('fs').mkdirSync

function createFileTransformerSync(transformation) {
	return function transformFileSync({
		workingDirectoryPath = process.cwd(),
		inputFilePath,
		outputFilePath
	}) {
		const absoluteInputFilePath = resolve(workingDirectoryPath, inputFilePath)
		const absoluteOutputFilePath = resolve(workingDirectoryPath, outputFilePath)
		ensureDirectory(dirname(absoluteOutputFilePath))
		const input = readFileSync(absoluteInputFilePath)
		const output = transformation(input)
		const absoluteOutputFilePaths = []
		if (absoluteInputFilePath !== absoluteOutputFilePath || input.toString() !== output.toString()) {
			writeFileSync(absoluteOutputFilePath, output)
			absoluteOutputFilePaths.push(absoluteOutputFilePath)
		}
		return {
			absoluteInputFilePath,
			absoluteOutputFilePaths
		}
	}
}

function ensureDirectory(path) {
	try {
		const stat = statSync(path)
		if (stat.isDirectory()) return
	} catch (error) {
		if (error.code === 'ENOENT') {
			const next = dirname(path)
			if (path === next) throw new Error(`Unable to create path "${path}".`)
			ensureDirectory(next)
			mkdirSync(path)
		} else {
			throw error
		}
	}
}

module.exports = createFileTransformerSync
