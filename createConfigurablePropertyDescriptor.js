// @flow

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
// type PropertyDescriptor<T> = {
// 	value?:?T,              // default: undefined
// 	writable?:boolean,     // default: false
// 	enumerable?:boolean,   // default: false
// 	configurable?:boolean, // default: false
// 	get?:Function,         // default: undefined
// 	set?:Function          // default: undefined
// }

/**
 * Returns a PropertyDescriptor object.
 */
export default function createConfigurablePropertyDescriptor<T>(value:T):{ value:T, configurable:true } {
	return {
		value,
		configurable: true
	}
}
