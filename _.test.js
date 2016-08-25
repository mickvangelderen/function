/* eslint-env mocha */
import _ from './_'
import expect from 'must'

describe('_', () => {
	
	it('should equal itself', () => {
		expect(_).to.equal(_)
	})

	it('should be inequal to a similar thing', () => {
		expect(_).to.not.equal(Symbol('argument placeholder'))
		expect(_).to.not.equal('argument placeholder')
	})

})
