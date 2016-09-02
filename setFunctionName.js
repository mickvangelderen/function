// @flow

/**
 * Modify the name of a function.
 */
export default function setFunctionName(name:string, func:Function):Function {
  return Object.defineProperty(func, 'name', { value: name, configurable: true })
}
