const moment = require('moment');

const getValue = value => {
    if (value == null) return null;
    const duration = moment.duration(value, 'seconds');
    if (!duration.isValid()) return null;
    return duration;
};

module.exports = getValue;
