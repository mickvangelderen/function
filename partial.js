// @flow

import _ from './_'

/**
 * Symbol behind which the fixed arguments and the original function are stored.
 * @private
 */
export const _PARTIAL = Symbol('partial information')

/**
 * Merges arguments, taking the placeholder into account.
 * @private
 */
export function _mergeArguments(argu:Array<any>, ments:Array<any>):Array<any> {
	const args = []
	let i = 0;
	let j = 0;
	while(i < argu.length) {
		const a = argu[i]
		args[i++] = a === _
			? j < ments.length
				? ments[j++]
				: _
			: a
	}
	while(j < ments.length) {
		args[i++] = ments[j++]
	}
	return args
}

/**
 * Counts the number of non-placeholder arguments.
 * @private
 */
export function _argumentCount(args:Array<any>):number {
	let count = 0
	for (let i = 0; i < args.length; i++) {
		if (args[i] !== _) count++
	}
	return count
}

/**
 * Create a new version of the function where the given arguments are already filled in.
 */
export default function partial(args:Array<any>, func:Function):Function {
	if (typeof args !== 'object' || args === null || !args.hasOwnProperty(
		'length')) {
		throw new TypeError('Expected an iterable object.')
	}
	if (typeof func !== 'function') {
		throw new TypeError('Expected a function.')
	}

	let args_
	let func_

	if (func.hasOwnProperty(_PARTIAL)) {
		const p = func[_PARTIAL]
		args_ = _mergeArguments(p.args, args)
		func_ = p.func
	} else {
		args_ = args
		func_ = func
	}

	return Object.defineProperties(
		function self() {
			const { args, func } = self[_PARTIAL]
			return func.apply(this, _mergeArguments(args, arguments))
		},
		{
			name: {
				value: func.name
					? /^partial /.test(func.name)
						? func.name
						: `partial ${func.name}`
					: 'partial',
				configurable: true
			},
			length: {
				value: Math.max(0, func.length - _argumentCount(args_)),
				configurable: true
			},
			[_PARTIAL]: {
				value: {
					args: args_,
					func: func_
				},
				configurable: true
			}
		}
	)
}
