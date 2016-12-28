/* eslint-env mocha */
const expect = require('must')
const set_function_name_and_arity = require('./set_function_name_and_arity')

describe('set_function_name_and_arity', () => {

	it('should be a function', () => {
		expect(set_function_name_and_arity).to.be.a.function()
	})

	it('should set the name of a function', () => {
		function createAddFunction() {
			return function() {
				return arguments[0] + arguments[1]
			}
		}

		const f = createAddFunction()

		expect(f.name).to.equal('')
		expect(f.length).to.equal(0)

		set_function_name_and_arity(f, 'add', 2)

		expect(f.name).to.equal('add')
		expect(f.length).to.equal(2)
	})

})
