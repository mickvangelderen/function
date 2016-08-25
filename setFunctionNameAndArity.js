// @flow

import createConfigurablePropertyDescriptor from './createConfigurablePropertyDescriptor'

/**
 * Modify both the name and the arity of a function.
 */
export default function setFunctionNameAndArity(name:string, arity:number, func:Function):Function {
	return Object.defineProperties(func, {
		name: createConfigurablePropertyDescriptor(name),
		length: createConfigurablePropertyDescriptor(arity)
	})
}