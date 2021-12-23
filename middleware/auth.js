const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

async function auth(req, res, next) {
    try {
        //  const token = await req.cookies.token;
        const token = await req.body.token || req.query.token || req.cookies['x-access-token'] || req.headers['x-access-token'];
        console.log(token);

        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

        const verified = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.user;

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ ErrorMessage: "Unauthorized" });
    }
}

module.exports = auth;