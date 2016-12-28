// @flow

const _argument_count = require('./_argument_count')
const _merge_arguments = require('./_merge_arguments')
const _PARTIAL_KEY = require('./_PARTIAL_KEY')

/**
 * Create a new version of the function where the given arguments are already filled in.
 */
module.exports = function partial(func:Function, args:Array<any>):Function {
	if (typeof func !== 'function') {
		throw new TypeError('Expected a function.')
	}
	if (typeof args !== 'object' || args === null || !args.hasOwnProperty(
		'length')) {
		throw new TypeError('Expected an iterable object.')
	}

	let args_
	let func_

	if (func.hasOwnProperty(_PARTIAL_KEY)) {
		const p = func[_PARTIAL_KEY]
		args_ = _merge_arguments(p.args, args)
		func_ = p.func
	} else {
		args_ = args
		func_ = func
	}

	return Object.defineProperties(
		function partial() {
			const { args, func } = partial[_PARTIAL_KEY]
			return func.apply(this, _merge_arguments(args, arguments))
		},
		{
			name: {
				value: func.name
					? /^partial( |$)/.test(func.name)
						? func.name
						: `partial ${func.name}`
					: 'partial',
				configurable: true
			},
			length: {
				value: Math.max(0, func.length - _argument_count(args_)),
				configurable: true
			},
			[_PARTIAL_KEY]: {
				value: {
					args: args_,
					func: func_
				},
				configurable: true
			}
		}
	)
}
