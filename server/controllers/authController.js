const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Token generation
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// User registration
const registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Kullanıcının zaten mevcut olup olmadığını kontrol et
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
    
        // Yeni kullanıcı oluştur
        const newUser = new User({ username, password, role }); // role bilgisi ile yeni kullanıcı oluştur
        await newUser.save();
    
        // Kullanıcıya bir token oluştur
        const token = generateToken(newUser);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
// User login
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser };
