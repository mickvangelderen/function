/* eslint-env mocha */
const _ = require('./PLACEHOLDER')
const _merge_arguments = require('./_merge_arguments')
const expect = require('must')

describe('_merge_arguments', () => {

	it('should be a function', () => {
		expect(_merge_arguments).to.be.a.function()
	})

	it('should merge arguments', () => {
		expect(_merge_arguments([      ], [      ])).to.eql([      ])
		expect(_merge_arguments([ 1    ], [      ])).to.eql([ 1    ])
		expect(_merge_arguments([      ], [ 1    ])).to.eql([ 1    ])
		expect(_merge_arguments([ 1    ], [ 2    ])).to.eql([ 1, 2 ])
		expect(_merge_arguments([ 1, 2 ], [      ])).to.eql([ 1, 2 ])
		expect(_merge_arguments([      ], [ 1, 2 ])).to.eql([ 1, 2 ])
	})

	it('should merge arguments and overwrite placeholders', () => {
		expect(_merge_arguments([ _ ], [])).to.eql([ _ ])
		expect(_merge_arguments([], [ _ ])).to.eql([ _ ])
		expect(_merge_arguments([ _ ], [ _ ])).to.eql([ _ ])
		expect(_merge_arguments([ 1 ], [ _ ])).to.eql([ 1, _ ])
		expect(_merge_arguments([ _ ], [ 1 ])).to.eql([ 1 ])
		expect(_merge_arguments([ 1, _, 3 ], [ 2 ])).to.eql([ 1, 2, 3 ])
		expect(_merge_arguments([ _, _, 3 ], [ 1, _, 4 ])).to.eql([ 1, _, 3, 4 ])
	})

})
