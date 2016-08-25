/* eslint-env mocha */
import expect from 'must'
import setFunctionArity from './setFunctionArity'

describe('setFunctionArity', () => {
	
	it('should be a function', () => {
		expect(setFunctionArity).to.be.a.function()
	})

	it('should set the arity of a function', () => {
		function add() {
			return arguments[0] + arguments[1]
		}

		expect(add.length).to.equal(0)

		setFunctionArity(2, add)

		expect(add.length).to.equal(2)
	})

})
