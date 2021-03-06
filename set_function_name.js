// @flow

/**
 * Modify the name of a function.
 */
module.exports = function set_function_name(func:Function, name:string):Function {
  return Object.defineProperty(func, 'name', { value: name, configurable: true })
}
