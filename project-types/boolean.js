const getValue = value => {
    if (typeof value == 'boolean') return value;
    return null;
};

module.exports = getValue;
