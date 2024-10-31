const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Bağlantısı
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('MongoDB-ə uğurla qoşuldu'))
  .catch(err => {
    console.error('MongoDB-ə qoşularkən xəta:', err);
    process.exit(1);  // Sunucuyu durdurun eğer bağlantı başarısızsa
  });
  
// Product marşrutlarını yönləndir
app.use('/api/mehsullar', productRoutes);

// Sunucunu Başlat
app.listen(PORT, () => {
  console.log(`${PORT} portunda işləyir.`);
});
