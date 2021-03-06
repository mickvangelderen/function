// @flow

/**
 * Modify the arity of a function.
 */
module.exports = function set_function_arity(func:Function, arity:number):Function {
  return Object.defineProperty(func, 'length', { value: arity, configurable: true })
}
