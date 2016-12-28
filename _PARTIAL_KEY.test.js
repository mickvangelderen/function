/* eslint-env mocha */
const _PARTIAL_KEY = require('./_PARTIAL_KEY')
const expect = require('must')

describe('_PARTIAL_KEY', () => {

	it('should be an object', () => {
		expect(_PARTIAL_KEY).to.be.a.symbol()
	})

	it('should not be a public Symbol', () => {
		const inner = String(_PARTIAL_KEY).replace(/^Symbol\((.*)\)$/, '$1')
		expect(inner).to.equal('_PARTIAL_KEY')
		expect(_PARTIAL_KEY).to.not.equal(Symbol.for('inner'))
	})

})
