import React, { useState } from 'react';

const AddPage = () => {
  const [productName, setProductName] = useState('');
  const [soldQuantity, setSoldQuantity] = useState(0);
  const [preparedQuantity, setPreparedQuantity] = useState(0);
  const [unfitQuantity, setUnfitQuantity] = useState(0);
  const [expiredQuantity, setExpiredQuantity] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      productName,
      soldQuantity,
      preparedQuantity,
      unfitQuantity,
      expiredQuantity,
    };

    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      const savedProduct = await response.json();
      console.log('Ürün başarıyla eklendi:', savedProduct);
      // Gerekirse formu temizleyin
      setProductName('');
      setSoldQuantity(0);
      setPreparedQuantity(0);
      setUnfitQuantity(0);
      setExpiredQuantity(0);
    } else {
      console.error('Ürün eklenirken hata oluştu.');
    }
  };

  return (
    <div>
      <h1>Yeni Ürün Ekle</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Məhsulun Adı:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Satış Miqdarı:</label>
          <input
            type="number"
            value={soldQuantity}
            onChange={(e) => setSoldQuantity(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Hazırlanan Miqdar:</label>
          <input
            type="number"
            value={preparedQuantity}
            onChange={(e) => setPreparedQuantity(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Yararsız:</label>
          <input
            type="number"
            value={unfitQuantity}
            onChange={(e) => setUnfitQuantity(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Satış Tarihi Bitmiş:</label>
          <input
            type="number"
            value={expiredQuantity}
            onChange={(e) => setExpiredQuantity(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Ürünü Ekle</button>
      </form>
    </div>
  );
};

export default AddPage;
