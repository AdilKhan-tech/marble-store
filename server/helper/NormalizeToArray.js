// utils/normalize.js
class NormalizeUtil {

    static normalizeToArray(value) {
        if (value === undefined || value === null) return [];
        return Array.isArray(value) ? value : [value];
    }

}

module.exports = NormalizeUtil;
