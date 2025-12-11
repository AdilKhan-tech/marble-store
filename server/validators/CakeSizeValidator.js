class CakeSizeValidator {
    static validateCreate(data) {
        const errors = [];

        if (!data.name_en || data.name_en.trim() === "") {
            errors.push("Name english is required.");
        } else if (data.name_en.length < 2 || data.name_en.length > 55) {
            errors.push("Name english must be 2–55 characters long.");
        }

        if (!data.name_ar || data.name_ar.trim() === "") {
            errors.push("Name arabic is required.");
        } else if (data.name_ar.length < 2 || data.name_ar.length > 55) {
            errors.push("Name arabic must be 2–55 characters long.");
        }

        if (!data.category_id || isNaN(data.category_id)) {
            errors.push("Category ID must be a valid number.");
        }

        if (!data.scoop_size) {
            errors.push("Scoop size is required.");
        }

        if (data.additional_price < 0) {
            errors.push("Additional price cannot be negative.");
        }

        if (data.status && !["active", "inactive"].includes(data.status)) {
            errors.push("Status must be active or inactive.");
        }

        return errors;
    }
}

module.exports = CakeSizeValidator;
