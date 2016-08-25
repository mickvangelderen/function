/* eslint-env mocha */
import expect from 'must'
import setFunctionName from './setFunctionName'

describe('setFunctionName', () => {
	
	it('should be a function', () => {
		expect(setFunctionName).to.be.a.function()
	})

	it('should set the name of a function', () => {
		function createAddFunction() {
			return function(a, b) {
				return a + b
			}
		}

		const f = createAddFunction()

		expect(f.name).to.equal('')

		setFunctionName('add', f)

		expect(f.name).to.equal('add')
	})

})
