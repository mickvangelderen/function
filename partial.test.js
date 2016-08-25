/* eslint-env mocha */
import _ from './_'
import partial from './partial'
import { _argumentCount } from './partial'
import { _mergeArguments } from './partial'
import { _PARTIAL } from './partial'

import expect from 'must'

describe('_mergeArguments', () => {

	it('should be a function', () => {
		expect(_mergeArguments).to.be.a.function()
	})

	it('should merge arguments', () => {
		expect(_mergeArguments([      ], [      ])).to.eql([      ])
		expect(_mergeArguments([ 1    ], [      ])).to.eql([ 1    ])
		expect(_mergeArguments([      ], [ 1    ])).to.eql([ 1    ])
		expect(_mergeArguments([ 1    ], [ 2    ])).to.eql([ 1, 2 ])
		expect(_mergeArguments([ 1, 2 ], [      ])).to.eql([ 1, 2 ])
		expect(_mergeArguments([      ], [ 1, 2 ])).to.eql([ 1, 2 ])
	})

	it('should merge arguments and overwrite placeholders', () => {
		expect(_mergeArguments([ _ ], [])).to.eql([ _ ])
		expect(_mergeArguments([], [ _ ])).to.eql([ _ ])
		expect(_mergeArguments([ _ ], [ _ ])).to.eql([ _ ])
		expect(_mergeArguments([ 1 ], [ _ ])).to.eql([ 1, _ ])
		expect(_mergeArguments([ _ ], [ 1 ])).to.eql([ 1 ])
		expect(_mergeArguments([ 1, _, 3 ], [ 2 ])).to.eql([ 1, 2, 3 ])
		expect(_mergeArguments([ _, _, 3 ], [ 1, _, 4 ])).to.eql([ 1, _, 3, 4 ])
	})

})

describe('_argumentCount', () => {
	
	it('should be a function', () => {
		expect(_argumentCount).to.be.a.function()
	})

	it('should return the number of non-placeholder arguments', () => {
		expect(_argumentCount([])).to.equal(0)
		expect(_argumentCount([ _ ])).to.equal(0)
		expect(_argumentCount([ 1 ])).to.equal(1)
		expect(_argumentCount([ _, 2 ])).to.equal(1)
		expect(_argumentCount([ 1, _ ])).to.equal(1)
		expect(_argumentCount([ 1, _, 3 ])).to.equal(2)
		expect(_argumentCount([ 1, 2, _ ])).to.equal(2)
	})

})

describe('partial', () => {
	
	it('should be a function', () => {
		expect(partial).to.be.a.function()
	})

	it('should create a partially applied function', () => {
		function add(a, b) {
			return a + b
		}

		const inc = partial([ 1 ], add)

		expect(inc.name).to.equal('partial add')
		expect(inc.length).to.equal(1)
		expect(inc[_PARTIAL]).to.eql({
			func: add,
			args: [ 1 ]
		})
		expect(inc(1)).to.equal(2)
	})

	it('should create a partially applied function of a partially applied function intelligently', () => {
		function div(a, b) {
			return a/b
		}

		const div12 = partial([ 12 ], div)
		const two = partial([ 6 ], div12)

		expect(two.name).to.equal('partial div')
		expect(two.length).to.equal(0)
		expect(two[_PARTIAL]).to.eql({
			func: div,
			args: [ 12, 6 ]
		})
		expect(two()).to.equal(2)
	})

	it('should take into account placeholders', () => {
		function div(a, b) {
			return a/b
		}

		expect(
			partial([ 6 ], 
				partial([ 12, _ ], div)
			)()
		).to.equal(2)

		expect(
			partial([ 12 ], 
				partial([ _, 6 ], div)
			)()
		).to.equal(2)
	})

	it('should not return a function with a negative arity', () => {
		expect(partial([ 1 ], function () {}).length).to.equal(0)
	})

})
