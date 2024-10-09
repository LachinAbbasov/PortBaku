const createProduct = async (req, res) => {
    try {
      const { productName, soldQuantity, preparedQuantity, unfitQuantity, expiredQuantity } = req.body;
  
      // Məlumatların düzgünlüyünü yoxlayın
      if (!productName || !soldQuantity || !preparedQuantity || !unfitQuantity || !expiredQuantity) {
        return res.status(400).json({ message: 'Bütün sahələr doldurulmalıdır.' });
      }
  
      const newProduct = new Product({
        productName,
        soldQuantity,
        preparedQuantity,
        unfitQuantity,
        expiredQuantity,
      });
  
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Xəta baş verdi:', error); // Konsola xəta mesajını yaz
      res.status(500).json({ message: 'Server xətası' });
    }
  };
  