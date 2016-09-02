// @flow

/**
 * Modify both the name and the arity of a function.
 */
export default function setFunctionNameAndArity(name:string, arity:number, func:Function):Function {
	return Object.defineProperties(func, {
		name: {
			value: name,
			configurable: true
		},
		length: {
			value: arity,
			configurable: true
		}
	})
}
