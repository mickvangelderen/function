/* eslint-env mocha */
const _ = require('./PLACEHOLDER')
const expect = require('must')

describe('PLACEHOLDER', () => {

	it('should be a symbol', () => {
		expect(_).to.be.a.symbol()
	})

	it('should not be a public symbol', () => {
		const inner = String(_).replace(/^Symbol\((.*)\)$/, '$1')
		expect(inner).to.equal('PLACEHOLDER')
		expect(_).to.not.equal(Symbol.for('inner'))
	})

})
