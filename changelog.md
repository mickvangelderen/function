<a name="0.6.1"></a>
## [0.6.1](https://github.com/mickvangelderen/function/compare/0.6.0...v0.6.1) (2016-12-28)


### Bug Fixes

* Anonymous function name ([d7acbfb](https://github.com/mickvangelderen/function/commit/d7acbfb))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/mickvangelderen/function/compare/0.3.0...0.6.0) (2016-12-28)


### Code Refactoring

* Make things easier to read and use ([333d023](https://github.com/mickvangelderen/function/commit/333d023))


### BREAKING CHANGES

* Renamed API.

 - All files are now written snake_case.
 - All exposed functions and variables are now written snake_case.
 - `_.js` was renamed to `PLACEHOLDER.js`.
 - Default exports are no longer under '.default'.

```js
const partial = require('function/partial').default
```

becomes simply

```js
const partial = require('function/partial')
```

- The func argument of `partial`, `set_function_arity`,
  `set_function_name` and `set_function_name_and_arity` moved from last
  to first.

```js
partial([ _, 2 ], div)
```

becomes

```js
partial(div, [ _, 2 ])
```



<a name="0.3.0"></a>
# [0.3.0](https://github.com/mickvangelderen/function/compare/0.2.0...0.3.0) (2016-09-02)



<a name="0.2.0"></a>
# 0.2.0 (2016-09-02)



