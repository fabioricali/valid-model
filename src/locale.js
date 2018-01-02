/**
 * Locale object
 * @type {{UNKNOWN_TYPE: string, TYPE_FAIL: string, TYPE_FUNCTION_FAIL: string, FIELD_REQUIRED: string, DATA_REQUIRED: string}}
 */
module.exports = {
    UNKNOWN_TYPE: 'Unknown type: "{type}"',
    TYPE_FAIL: '"{path}" expects "{type}" type but receives: {dataField}',
    TYPE_ARRAY_FAIL: '"{path}" expects array of "{type}" type but receives: {dataField}',
    TYPE_FUNCTION_FAIL: '"{path}" receives: {dataField}',
    FIELD_REQUIRED: '"{path}" is required',
    FIELD_CANNOT_EMPTY: '"{path}" cannot be empty',
    DATA_REQUIRED: 'Data is required and must be an object'
};