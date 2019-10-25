const getTypeValue = require('./getTypeValue');

const mapper = keyTypes => {
    return item => {
        const mapped = {};
        for (let key of Object.keys(item)) {
            mapped[key] = getTypeValue(keyTypes[key], item[key]);
        }
        return mapped;
    };
};

module.exports = mapper;
