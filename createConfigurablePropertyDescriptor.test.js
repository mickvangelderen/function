/* eslint-env mocha */
import createConfigurablePropertyDescriptor from './createConfigurablePropertyDescriptor'
import expect from 'must'

describe('createConfigurablePropertyDescriptor', () => {

	it('should be a function', () => {
		expect(createConfigurablePropertyDescriptor).to.be.a.function()
	})

	it('should return a property descriptor', () => {
		expect(
			Object.getOwnPropertyDescriptor(
				Object.defineProperty({}, 'x', createConfigurablePropertyDescriptor('value')),
				'x'
			)
		).to.eql({
			value: 'value',
			writable: false,
			enumerable: false,
			configurable: true
		})
	})

})
