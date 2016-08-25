#!node_modules/.bin/babel-node

import _ from 'function/_'
import partial from 'function/partial'

// Create a function that repeats a string.

function repeat(string, repetitions) {
	let result = ''
	for (let i = 0; i < repetitions; i++) {
		result += string
	}
	return result
}

console.log(repeat('yes', 3)) // yesyesyes



// Derive a function that has the first argument fixed to 'ha'.

const repeatHa = partial([ 'ha' ], repeat)

console.log(repeatHa(3)) // hahaha



// Derive a function that has the second argument fixed to 2.

const repeat2 = partial([ _, 2 ], repeat)

console.log(repeat2('boo')) // booboo
