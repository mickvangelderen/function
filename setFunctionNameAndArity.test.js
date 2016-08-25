/* eslint-env mocha */
import expect from 'must'
import setFunctionNameAndArity from './setFunctionNameAndArity'

describe('setFunctionNameAndArity', () => {
	
	it('should be a function', () => {
		expect(setFunctionNameAndArity).to.be.a.function()
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

		setFunctionNameAndArity('add', 2, f)

		expect(f.name).to.equal('add')
		expect(f.length).to.equal(2)
	})

})
