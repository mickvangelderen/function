const sortObject = require('sort-object-circular').default

function createJsonTransformer(transformation, options = {}) {
	const {
		replacer = null,
		space = 2,
		sort = false
	} = options
	const sortCall = sort
		? sortObject
		: x => x

	return function transformJson(input) {
		return JSON.stringify(
			sortCall(
				transformation(
					JSON.parse(input)
				)
			),
			replacer,
			space
		) + '\n'
	}
}

module.exports = createJsonTransformer
