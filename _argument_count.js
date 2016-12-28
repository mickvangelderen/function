const _ = require('./PLACEHOLDER')

/**
 * Counts the number of non-placeholder arguments.
 * @private
 */
module.exports = function _argument_count(args:Array<any>):number {
	let count = 0
	for (let i = 0; i < args.length; i++) {
		if (args[i] !== _) count++
	}
	return count
}
