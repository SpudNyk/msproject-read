const booleanValue = require('./boolean');
const dateValue = require('./date');
const durationValue = require('./duration');
const floatValue = require('./float');
const integerValue = require('./integer');

const getTypeValue = (type, value) => {
    switch (type) {
        // Integers
        case 12:
        case 17:
        case 19:
            return integerValue(value);
        // Floats
        case 3:
        case 5:
        case 7:
        case 8:
            return floatValue(value);
        // Dates
        case 2:
            return dateValue(value);
        // Durations
        case 6:
        case 16:
            return durationValue(value);
        // Boolean
        case 4:
            return booleanValue(value);
        default:
            return value;
    }
};

module.exports = getTypeValue;
