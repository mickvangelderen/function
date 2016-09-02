// @flow

/**
 * Modify the arity of a function.
 */
export default function setFunctionArity(arity:number, func:Function):Function {
  return Object.defineProperty(func, 'length', { value: arity, configurable: true })
}
