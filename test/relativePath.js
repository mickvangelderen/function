/* eslint-env node */

const relative = require('path').relative

function relativePath(path) {
	return relative(process.cwd(), path)
}

module.exports = relativePath
