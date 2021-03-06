// @flow

/**
 * Modify both the name and the arity of a function.
 */
module.exports = function set_function_name_and_arity(func:Function, name:string, arity:number):Function {
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
