const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const apiKey = req.headers['x-api-key'];
    const serverApiKey = process.env.API_KEY; // .env file se

    // Agar X-API-Key valid hai toh allow
    if (apiKey && apiKey === serverApiKey) {
        return next();
    }

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
 
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Authorization token required' });
    }
};

module.exports = authenticateToken;