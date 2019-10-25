const moment = require('moment');

const getValue = value => {
    if (value == null) return null;
    const date = moment.utc(value, moment.ISO_8601);
    if (!date.isValid()) return null;
    return date;
};

module.exports = getValue;