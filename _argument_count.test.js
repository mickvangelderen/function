/* eslint-env mocha */
const _ = require('./PLACEHOLDER')
const _argument_count = require('./_argument_count')
const expect = require('must')

describe('_argument_count', () => {

	it('should be a function', () => {
		expect(_argument_count).to.be.a.function()
	})

	it('should return the number of non-placeholder arguments', () => {
		expect(_argument_count([])).to.equal(0)
		expect(_argument_count([ _ ])).to.equal(0)
		expect(_argument_count([ 1 ])).to.equal(1)
		expect(_argument_count([ _, 2 ])).to.equal(1)
		expect(_argument_count([ 1, _ ])).to.equal(1)
		expect(_argument_count([ 1, _, 3 ])).to.equal(2)
		expect(_argument_count([ 1, 2, _ ])).to.equal(2)
	})

})
