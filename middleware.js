const jwt = require('jsonwebtoken');

const JWT_SECRET = '123456';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.error('Error verifying token:', err);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }
  
module.exports = authenticateToken;