const be = require('bejs');
const TYPES = require('./types');

const check = [];

check[TYPES.ARGUMENTS] = be.argument.bind(this);
check[TYPES.ARRAY] = be.array.bind(this);
check[TYPES.BOOLEAN] = be.boolean.bind(this);
check[TYPES.BUFFER] = be.buffer.bind(this);
check[TYPES.DATE] = be.date.bind(this);
check[TYPES.ERROR] = be.error.bind(this);
check[TYPES.FLOAT32ARRAY] = be.float32Array.bind(this);
check[TYPES.FLOAT64ARRAY] = be.float64Array.bind(this);
check[TYPES.FUNCTION] = be.function.bind(this);
check[TYPES.GENERATORFUNCTION] = be.generatorFunction.bind(this);
check[TYPES.INT8ARRAY] = be.int8Array.bind(this);
check[TYPES.INT16ARRAY] = be.int16Array.bind(this);
check[TYPES.INT32ARRAY] = be.int32Array.bind(this);
check[TYPES.MAP] = be.map.bind(this);
check[TYPES.NULL] = be.null.bind(this);
check[TYPES.NUMBER] = be.number.bind(this);
check[TYPES.OBJECT] = be.object.bind(this);
check[TYPES.PROMISE] = be.promise.bind(this);
check[TYPES.REGEXP] = be.regexp.bind(this);
check[TYPES.SET] = be.set.bind(this);
check[TYPES.STRING] = be.string.bind(this);
check[TYPES.SYMBOL] = be.symbol.bind(this);
check[TYPES.UINT16ARRAY] = be.uint16Array.bind(this);
check[TYPES.UINT32ARRAY] = be.uint32Array.bind(this);
check[TYPES.UINT8ARRAY] = be.uint8Array.bind(this);
check[TYPES.UINT8CLAMPEDARRAY] = be.uint8ClampedArray.bind(this);
check[TYPES.UNDEFINED] = be.undefined.bind(this);
check[TYPES.WEAKMAP] = be.weakMap.bind(this);
check[TYPES.WEAKSET] = be.weakSet.bind(this);

check[TYPES.ALPHANUMERIC] = be.alphanumeric.bind(this);
check[TYPES.ANY] = () => true;
check[TYPES.DATESTRING] = be.dateString.bind(this);
check[TYPES.EMAIL] = be.email.bind(this);
check[TYPES.FLOAT] = be.float.bind(this);
check[TYPES.INT] = be.int.bind(this);
check[TYPES.IP] = be.ip.bind(this);
check[TYPES.TIMESTRING] = be.timeString.bind(this);
check[TYPES.UUID] = be.uuid.bind(this);
check[TYPES.URL] = be.url.bind(this);

module.exports = check;