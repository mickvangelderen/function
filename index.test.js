/* eslint-env mocha, node */

const index = require('./')
const expect = require('must')
const join = require('path').join
const readdirSync = require('fs').readdirSync
const statSync = require('fs').statSync

describe('index', () => {

	it('should export public functionality', () => {
		const files = readdirSync(__dirname).map(filename => ({
			filename,
			stat: statSync(join(__dirname, filename))
		}))

		files
		.filter(({ filename, stat }) =>
			stat.isFile()
			&& false === /^_/.test(filename)
			&& /\.js$/.test(filename)
			&& false === /\.test\.js$/.test(filename)
			&& filename !== 'index.js'
		)
		.forEach(({ filename }) => {
			const name = filename.replace(/\.js$/, '')
			expect(index).to.have.ownProperty(name, require(join(__dirname, filename)))
		})
	})

})
