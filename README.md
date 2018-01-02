<div align="center">
<br/><br/>
<img width="220" src="https://raw.githubusercontent.com/fabioricali/valify/master/extra/logo-valify.png" title="Valify"/>
<br/>
Validates data to easy way in JavaScript.
<br/><br/><br/>
<a href="https://travis-ci.org/fabioricali/valify" target="_blank"><img src="https://travis-ci.org/fabioricali/valify.svg?branch=master" title="Build Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>
<br/><br/><br/>
</div>

Valify was created to easily validate data structures. With a simple syntax it is ideal in many contexts for example in REST API

**Documentation**
- [Installation](#installation)
    - [Browser](#browser)
- [Basic usage](#basic-usage)
- [Field options](#field-options)
- [Error object](#error-object)
- [Default values](#default-values)
- [Nested models](#nested-models)
- [Promises](#using-promise)
- [Manipulate data](#manipulate-data)
- [Define custom types](#define-custom-type)
    - [Arguments](#arguments-in-custom-type)
- [Locale](#locale)
- [Types](#available-types)

### Installation
```
npm install --save valify
```

#### Browser
```html
<script src="https://unpkg.com/valify/dist/valify.min.js"></script>
```

### Basic usage
```javascript
const Valify = require('valify');

// Define a model
const userModel = new Valify({
    firstName: 'string',
    lastName: 'string',
    age: 'int?', // this is not required
    role: {
        type: 'string',
        default: 'editor'
    },
    colors: ['string'],
    createdAt: {
        type: 'date',
        default: new Date()
    }
});

// A data object
const data = {
    firstName: 'Mike',
    lastName: 'Ricali',
    role: 'owner',
    colors: ['red', 'yellow', 'orange']
};

// Validate userModel
try {
    userModel(data);
} catch(e) {
    console.log(e.message, e.fields);
}
```

### Field options

|Property|Type|Default|Description|
|-|-|-|-|
|`type`|`object`,`array`,`string`,`function`|`null`|Type of control|
|`required`|`boolean`|`true`|Indicates if the field is required|
|`default`|`any`|`null`|Default value|
|`allowNull`|`boolean`|`false`|Allow null value, overwrites all checks|
|`allowEmpty`|`boolean`|`true`|Allow empty value, works for `string`, `array` and `object`|
|`locale`|`object`|`object`|An object that contains locale strings that overwrites those globals|
|`convert`|`function`|`null`|A function to manipulate/conversion data|
|`onError`|`function`|`null`|A function triggered when an check fails|

### Error object
Valify in case of errors returns an object with 2 properties:
- `message` is the first error occurred
- `fields` is an array of all errors occurred

```
{
    message: '"aParam.other.lastName" is required',
    fields: [
        {
            path: 'aParam.other.lastName', 
            message: '"aParam.other.lastName" is required', 
            field: 'lastName',
            type: 'string'
        }
    ]
}
```

### Default values
You can set a default value for each field, this setting overwrites `required` property to `false`.

```javascript
const Valify = require('valify');

// Define a model
const userModel = new Valify({
    name: 'string',
    role: {
        type: 'string',
        default: 'editor'
    }
});

// A data object
const data = {
    name: 'Mike Ricali'
};

try {
    userModel(data); //=> {name: 'Mike Ricali', role: 'editor'}
} catch(e) {
    console.log(e.message, e.fields);
}
```

### Nested models
It's possible also add nested model, for example you could have an array field like below:

```javascript

const userModel = new Valify({
    firstName: 'string',
    lastName: 'string',
    records: [new Valify({
        id: 'int',
        accessOn: 'date',
        otherNested: new Valify({
            color: 'string'
        })
    })]
});

// A data object
const data = {
    firstName: 'Mike',
    lastName: 'Ricali',
    records: [
        {
            id: 1,
            accessOn: '2017-12-23T00:01:00',
            otherNested: {
                color: 'red'
            }
        },
        {
            id: 2,
            accessOn: '2017-12-23T00:02:00',
            otherNested: {
                color: 'yellow'
            }
        },
        {
            id: 3,
            accessOn: '2017-12-23T00:03:00',
            otherNested: {
                color: 'green'
            }
        }
    ]
};

// Validate userModel
try {
    userModel(data);
} catch(e) {
    console.log(e.message, e.fields);
}
```

### Using promise
If you need to use with Promise must just add `usePromise` to model settings.

```javascript

// Define a model
const userModel = new Valify({
    firstName: {
        type: 'string',
        required: true
    },
    lastName: {
        type: 'string',
        required: true
    }
}, {
    usePromise: true
});

// A data object
const data = {
    firstName: 'Mike'
};

// Validate userModel
userModel(data).then(()=>{
    console.log('ok');
}).catch(e => {
    console.log(e);
    // An object like below
    /*
        {
            message: 'lastName is required',
            fields: [{field: 'lastName', message: 'lastName is required', path: 'lastName'}]
        }
     */
});

```

### Manipulate data
You may need to manipulate data before the validation.

```javascript
// Define a model
const userModel = new Valify({
    firstName: {
        type: 'string',
        convert: value => value.toUpperCase()
    },
    lastName: {
        type: 'string',
        convert: value => value.toUpperCase()
    },
    age: {
        type: 'number',
        convert: value => parseInt(value)
    }
});

// A data object
const data = {
    firstName: 'Mike',
    lastName: 'Ricali',
    age: '25'
};

userModel(data);

console.log(data.firstName, data.lastName, data.age, typeof data.age); //=> MIKE RICALI 25 number
```

### Define custom type
There are different ways to define custom types:

##### 1) Globally, using static method `addType`
```javascript

Valify.addType('mycustom1', (value, data) => {
    console.log(data);
    return value === 10;
});

// it's also possible returns a string as error like below
Valify.addType('mycustom2', (value) => {
    if (value !== 10)
        return 'ops... must be 10'
});

// Define a model
const userModel = new Valify({
    aNumber: 'mycustom1',
    otherNumber: 'mycustom2'
});

// A data object
const data = {
    aNumber: 9,
    otherNumber: 11,
};

try {
    userModel(data);
} catch(e) {
    console.log(e.message, e.fields);
} 
```

##### 2) Local, passing a function to `type` param
```javascript

// Define a model
const userModel = new Valify({
    aString: {
        type: value => typeof value === 'string'
    },
    // or 
    aBoolean: value => typeof value === 'boolean'
});

// A data object
const data = {
    aString: 'hello',
    aBoolean: 5
};

try {
    userModel(data);
} catch(e) {
    console.log(e.message, e.fields);
} 
```

#### Arguments in custom type
- Inside all custom type function are passed 3 arguments: 
    - `value`, current value
    - `data`, a copy of origin data object
    - `be`, a library used for several validations. More info on <a href="https://be.js.org/docs.html"><strong>beJS</strong></a>
    
Example

```javascript
new Valify({
    color0: 'string',
    color1: (value, data, be) => {
        if (!be.string(value))
            return 'must be a string';
        if (value === data.color0)
            return 'must be different of color0';
    }
})
```  

### Locale
You can set locale string in two ways:

##### 1) Globally, using static method `setLocale`
```javascript

Valify.setLocale({
    TYPE_FAIL: 'this type has failed'
});

```

**Default strings**

|Name|Default|
|-|-|
|`UNKNOWN_TYPE`|`Unknown type: "{type}"`|
|`TYPE_FAIL`|`"{path}" expects "{type}" but receives: {dataField}`|
|`TYPE_ARRAY_FAIL`|`"{path}" expects array of "{type}" but receives: {dataField}`|
|`TYPE_FUNCTION_FAIL`|`"{path}" receives: {dataField}`|
|`FIELD_REQUIRED`|`"{path}" is required`|
|`DATA_REQUIRED`|`Data is required and must be an object`|
|`FIELD_CANNOT_EMPTY`|`"{path}" cannot be empty`|

##### 2) Local, into field settings
```javascript

// Define a model
const userModel = new Valify({
    aString: {
        type: 'string',
        locale: {
            TYPE_FAIL: 'this type has failed'
        }
    }
});

```

- There are only two available properties:
    - **`TYPE_FAIL`**
    - **`TYPE_ARRAY_FAIL`**
    - **`FIELD_REQUIRED`**
    - **`FIELD_CANNOT_EMPTY`**

### Available types

All types that you can use:

- JavaScript standard
    - `arguments`
    - `array`
    - `boolean`
    - `buffer`
    - `date`
    - `error`
    - `float32array`
    - `float64array`
    - `function`
    - `generatorfunction`
    - `int16array`
    - `int32array`
    - `int8array`
    - `map`
    - `null`
    - `number`
    - `object`
    - `promise`
    - `regexp`
    - `set`
    - `string`
    - `symbol`
    - `uint16array`
    - `uint32array`
    - `uint8array`
    - `uint8clampedarray`
    - `undefined`
    - `weakmap`
    - `weakset`
    
- Extra    
    - `alphanumeric`
    - `any`
    - `datestring`
    - `email`
    - `float`
    - `int`
    - `ip`
    - `timestring`
    - `uuid`
    - `url`

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/Valify/blob/master/CHANGELOG.md">here</a>

## License
Valify is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>