/* eslint-env mocha */
const expect = require('must')
const set_function_name = require('./set_function_name')

describe('set_function_name', () => {

	it('should be a function', () => {
		expect(set_function_name).to.be.a.function()
	})

	it('should set the name of a function', () => {
		function createAddFunction() {
			return function(a, b) {
				return a + b
			}
		}

		const f = createAddFunction()

		expect(f.name).to.equal('')

		set_function_name(f, 'add')

		expect(f.name).to.equal('add')
	})

})
