const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token şeklinde alın

    if (!token) {
        return res.status(403).json({ message: 'Token is required' }); // Token yoksa 403 döner
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token'ı doğrula
        req.user = decoded; // Kullanıcı bilgilerini isteğe ekle
        next(); // İleri git
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' }); // Geçersiz token
    }
};

module.exports = verifyToken;
