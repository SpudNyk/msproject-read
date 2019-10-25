const getValue = value => {
    if (value == null) return null;
    if (typeof value == 'string') {
        value = Number(value)
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
        return Math.trunc(value);
    }
    return null;
};

module.exports = getValue;
