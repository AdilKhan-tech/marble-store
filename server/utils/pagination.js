const getPagination = (req) => {
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 100;
    const offset = (page - 1) * limit;

    return { page, limit, offset };
};

module.exports = getPagination;