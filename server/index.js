const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');  // Import auth routes
const verifyToken = require('./middleware/authMiddleware')
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/api/admin', verifyToken, (req, res) => {
  res.json({ message: 'Welcome Admin!', user: req.user });
});

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('MongoDB-ə uğurla qoşuldu'))
  .catch(err => {
    console.error('MongoDB-ə qoşularkən xəta:', err);
    process.exit(1);
  });

// Routes
app.use('/api/mehsullar', productRoutes);  // Protected product routes
app.use('/api/auth', authRoutes);  // Auth routes

// Sunucunu Başlat
app.listen(PORT, () => {
  console.log(`${PORT} portunda işləyir.`);
});
