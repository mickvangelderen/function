/* eslint-env mocha */
const expect = require('must')
const set_function_arity = require('./set_function_arity')

describe('set_function_arity', () => {

	it('should be a function', () => {
		expect(set_function_arity).to.be.a.function()
	})

	it('should set the arity of a function', () => {
		function add() {
			return arguments[0] + arguments[1]
		}

		expect(add.length).to.equal(0)

		set_function_arity(add, 2)

		expect(add.length).to.equal(2)
	})

})
