/* eslint-env mocha */
const _ = require('./PLACEHOLDER')
const partial = require('./partial')
const _PARTIAL_KEY = require('./_PARTIAL_KEY')

const expect = require('must')

describe('partial', () => {

	it('should be a function', () => {
		expect(partial).to.be.a.function()
	})

	it('should create a partially applied function', () => {
		function add(a, b) {
			return a + b
		}

		const inc = partial(add, [ 1 ])

		expect(inc.name).to.equal('partial add')
		expect(inc.length).to.equal(1)
		expect(inc[_PARTIAL_KEY]).to.eql({
			func: add,
			args: [ 1 ]
		})
		expect(inc(1)).to.equal(2)
	})

	it('should create a partially applied function of a partially applied function intelligently', () => {
		function div(a, b) {
			return a/b
		}

		const div12 = partial(div, [ 12 ])
		const two = partial(div12, [ 6 ])

		expect(two.name).to.equal('partial div')
		expect(two.length).to.equal(0)
		expect(two[_PARTIAL_KEY]).to.eql({
			func: div,
			args: [ 12, 6 ]
		})
		expect(two()).to.equal(2)

		expect(partial(function() {}, []).name).to.equal('partial')
		expect(partial(partial(function () {}, []), []).name).to.equal('partial')
	})

	it('should take into account placeholders', () => {
		function div(a, b) {
			return a/b
		}

		expect(
			partial(partial(div, [ 12, _ ]), [ 6 ])()
		).to.equal(2)

		expect(
			partial(partial(div, [ _, 6 ]), [ 12 ])()
		).to.equal(2)
	})

	it('should not return a function with a negative arity', () => {
		expect(partial(() => {}, [ 1 ]).length).to.equal(0)
	})

})
