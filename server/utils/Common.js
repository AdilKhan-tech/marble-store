// utils/normalize.js
class Common {

    static normalizeToArray(value) {
        if (value === undefined || value === null) return [];
        return Array.isArray(value) ? value : [value];
    }

}

module.exports = Common;
