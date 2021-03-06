# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

[4.6.0] - 2019-06-21
- **Added** `appendToError` option to model definition, now it's possible add an object to error stack

[4.5.0] - 2018-06-21
- **Changed** if value is not defined now `default` is also passed to `convert` function

[4.4.4] - 2018-03-11
- **Fixed** undefined value now is converted to string for error message

[4.4.2] - 2018-03-09
- **Fixed** issue #11

[4.4.1] - 2018-02-27
- **Fixed** immutable issue on nested models

[4.4.0] - 2018-02-27
- **Added** `overwriteUndefined` option to model definition

[4.3.0] - 2018-02-24
- **Added** `returnImmutable` option to model definition

[4.2.3] - 2018-02-22
- **Added** polyfill endsWith

[4.2.2] - 2018-02-22
- **Added** polyfill Object.assign

[4.2.1] - 2018-02-09
- **Added** `bejs` as argument to `convert` function

[4.2.0] - 2018-02-08
- **Added** `autoCast` option to model definition, now it's possible cast a string (where possible) to a primitive type

[4.1.1] - 2018-02-08
- **Fixed** throw error if data object is without prototype

[4.1.0] - 2018-01-17
- **Added** new static method: `addTypes`, now it's possible add more types at once

[4.0.2] - 2018-01-14
- Bug fix

[4.0.1] - 2018-01-03
- **Added** new extra type: `alpha`
- **Changed** upgrade assertions lib to last version

[4.0.0] - 2018-01-03
- **Added** `path` property to error object
- **Added** `type` property to error object
- **Added** `detectUnknown` property to model definition
- **Fixed** repeated errors in nested model scenario
- **Breaking changes**
    - **Changed** in locale strings {field} with {path}
    - **Changed** `convert` position, now is before all checks
    - **Removed** validators, use custom types instead

[3.3.1] - 2017-12-28
- **Added** new type `any`
- **Added** new property `allowEmpty`, now it's possible check if a string or an array or an object are empties

[3.2.0] - 2017-12-26
- **Changed** now custom validator function can be returns a string as error
- **Fixed** wrong `arguments` type name before was "argument" 

[3.1.0] - 2017-12-24
- **Added** optional type symbol, now it's possible declare an optional type without set `required` property to `false`, but just so "string?"
- **Changed** now custom validator function can be returns a boolean in addition to Error
- **Fixed** default `required` value was `null`, now is set to `true`

[3.0.0] - 2017-12-23
- **Added** `validate` property
- **Added** validators
- **Added** support to nested model
- **Changed** now `convert` cannot change type, value is closely related to type check and validators check
- **Changed** now custom type supports also Error call
- **Deprecated** multi-type settings

[2.0.0] - 2017-12-19
- **Added** `allowNull` property to field settings that overwrites all types checks if it's enabled and the value is `null`
- **Changed** error property name from `last` to `message` that it's returned by promise reject

[1.2.0] - 2017-12-18
- **Changed** now `ValifyError` returns a second argument with errors list
- Bug fixed

[1.1.0] - 2017-12-18
- **Added** locale settings
- **Added** support to multi-type functions
- **Changed** now `type` property can be a function

[0.0.2] - 2017-12-16
- Fix build badge

[0.0.1] - 2017-12-16
- First release