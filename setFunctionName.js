// @flow

import createConfigurablePropertyDescriptor from './createConfigurablePropertyDescriptor'

/**
 * Modify the name of a function.
 */
export default function setFunctionName(name:string, func:Function):Function {
  return Object.defineProperty(func, 'name', createConfigurablePropertyDescriptor(name))
}
