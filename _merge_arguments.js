const _ = require('./PLACEHOLDER')

/**
 * Merges arguments, taking the placeholder into account.
 * @private
 */
module.exports = function _merge_arguments(argu:Array<any>, ments:Array<any>):Array<any> {
	const args = []
	let i = 0;
	let j = 0;
	while(i < argu.length) {
		const a = argu[i]
		args[i++] = a === _
			? j < ments.length
				? ments[j++]
				: _
			: a
	}
	while(j < ments.length) {
		args[i++] = ments[j++]
	}
	return args
}
