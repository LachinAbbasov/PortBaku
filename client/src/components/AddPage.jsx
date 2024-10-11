import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Button, Form, Select } from 'antd';
import { addProduct, selectProducts } from '../redux/productSlice';

const { Option } = Select;

const categoryProducts = {
  Mayalı: [
    { name: 'Sadə bulka', price: 1.10 },
    { name: 'Kişmişli', price: 1.10 },
    { name: 'Qarabağ kətəsi', price: 1.40 },
    { name: 'Simit', price: 1.20 },
    { name: 'Vatruşka', price: 1.20 },
    { name: 'Alma cemli', price: 1.30 },
    { name: 'Kəsmikli kökə', price: 1.50 },
    { name: 'Şokaladlı', price: 1.70 },
    { name: 'Albalı cemli', price: 1.30 },
    { name: 'Qozlu', price: 1.70 },
    { name: 'Qoğal şor', price: 1.20 },
    { name: 'Qoğal şirin', price: 1.10 },
    { name: 'Darçınlı bulka', price: 1.10 },
    { name: 'Minni pizza', price: 3.50 },
    { name: 'Hod-dog', price: 1.80 },
    { name: 'Qaraköy', price: 1.30 },
    { name: 'Özbək dönəri', price: 2.20 },
    { name: 'Xaçapuri', price: 1.80 },
    { name: 'Qatlama toyuqlu', price: 15, weight: '1 kq' },
    { name: 'Peraşki kartoflu', price: 1.30 },
    { name: 'Peraşki toyuqlu', price: 1.60 },
    { name: 'Pendirli açma', price: 1.90 },
    { name: 'Fransız bulkası', price: 1.90 }
  ],
  Tort: [
    { name: 'Yay tortu M', price: 30.00 },
    { name: 'Yay tortu S', price: 25.00 },
    { name: 'Birdmilk M', price: 25.00 },
    { name: 'Birdmilk S', price: 19.00 },
    { name: 'Honey M', price: 23.00 },
    { name: 'Honey S', price: 18.00 },
    { name: 'Napaleon M', price: 22.00 },
    { name: 'Napaleon S', price: 18.00 },
    { name: 'Banana cake M', price: 20.00 },
    { name: 'Banana cake S', price: 14.00 },
    { name: 'Damla şokaladlı M', price: 20.00 },
    { name: 'Damla şokaladlı S', price: 14.00 },
    { name: 'Kiyeviski M', price: 21.00 },
    { name: 'Kiyeviski S', price: 15.00 },
    { name: 'Kudruyaj M', price: 27.00 },
    { name: 'Kudruyaj S', price: 21.00 },
    { name: 'Blinçik M', price: 24.00 },
    { name: 'Blinçik S', price: 18.00 },
    { name: 'Black Forest roll', price: 12.00 },
    { name: 'Redvel vet roll', price: 13.00 },
    { name: 'Orange cake', price: 9.50 },
    { name: 'Engilis cake', price: 7.00 },
    { name: 'Skazka roll', price: 11.00 },
    { name: 'Birdmilk desert', price: 3.00 },
    { name: 'Honey desert', price: 3.50 },
    { name: 'Tiramisu desert', price: 4.50 },
    { name: 'Praqa desert', price: 2.70 },
    { name: 'Kudruyaj desert', price: 3.50 },
    { name: 'San Sebastian', price: 4.50 }
  ],
  Paxlavalar: [
    { name: 'Qozlu paxlava', price: 20, weight: '1 kq' },
    { name: 'Fındıqlı paxlava', price: 20, weight: '1 kq' },
    { name: 'Şokaladlı paxlava', price: 20, weight: '1 kq' },
    { name: 'Türk paxlavaları', price: 25, weight: '1 kq' }
  ],
  QuruMallar: [
    { name: 'Şəkərbura', price: 1.80 },
    { name: 'Acı badəm', price: 20, weight: '1 kq' },
    { name: 'Şəkər çörəyi', price: 11, weight: '1 kq' },
    { name: 'Mutaki', price: 19, weight: '1 kq' },
    { name: 'Qozlu kətə', price: 17, weight: '1 kq' },
    { name: 'Limonçik', price: 15, weight: '1 kq' },
    { name: 'Damla peçeniyası', price: 12, weight: '1 kq' },
    { name: 'Qızıl gül (kukis)', price: 16, weight: '1 kq' }
  ],
  Kulinaria: [
    { name: 'Sendiviç Toyuq', price: 4.80 },
    { name: 'Sendiviç Club', price: 4.90 },
    { name: 'Sendiviç Vetçina', price: 4.80 },
    { name: 'Sendiviç Salami', price: 5.20 },
    { name: 'Sendiviç Salmon', price: 7.00 },
    { name: 'Blinçik ətli', price: 1.80 },
    { name: 'Blinçik toyuqlu', price: 1.60 },
    { name: 'Blinçik toyuq tərəvəzli', price: 1.60 },
    { name: 'Blinçik kəsmikli', price: 1.60 },
    { name: 'Şumardin blinçik', price: 2.50 },
    { name: 'Toyuq nuggets', price: 2.30 },
    { name: 'Şnitzel', price: 4.80 },
    { name: 'Toyuq kotleti', price: 4.30 },
    { name: 'Toyuq çöp şiş', price: 3.50 }
  ],
  Salatlar: [
    { name: 'Paytaxt salatı', price: 23, weight: '1 kq' },
    { name: 'Toyuq salatı mayanezli', price: 20, weight: '1 kq' },
    { name: 'Toyuq salatı mayonezsiz', price: 20, weight: '1 kq' },
    { name: 'Vinegret salatı', price: 20, weight: '1 kq' },
    { name: 'Gavalı salatı', price: 23, weight: '1 kq' },
    { name: 'Mimoza salatı', price: 22, weight: '1 kq' },
    { name: 'Nar salatı', price: 22, weight: '1 kq' },
    { name: 'Çuğundur salatı', price: 15, weight: '1 kq' }
  ],
  Yeməklər: [
    { name: 'Toyuq file', price: 28, weight: '1 kq' },
    { name: 'Fajitos', price: 23, weight: '1 kq' },
    { name: 'Zəfəran plov', price: 15, weight: '1 kq' },
    { name: 'Şəhriyyə plov', price: 14, weight: '1 kq' },
    { name: 'Qarabaşaq', price: 10, weight: '1 kq' },
    { name: 'Ev sayağı kartof', price: 10, weight: '1 kq' },
    { name: 'Sobada tərəvəz', price: 13, weight: '1 kq' },
    { name: 'Qril', price: 11.50 },
    { name: 'Ləvəngi', price: 13.50 },
    { name: 'Tabaka', price: 13.00 }
  ]
};



const AddPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const branches = ['İnqilab', 'Mərdəkan', 'Şüvalan', 'Aquapark', 'Nargilə', 'Mum', 'Buzovna', 'Bayl'];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [branchName, setBranchName] = useState('');
  const [soldQuantity, setSoldQuantity] = useState('');
  const [preparedQuantity, setPreparedQuantity] = useState('');
  const [unfitQuantity, setUnfitQuantity] = useState('');
  const [expiredQuantity, setExpiredQuantity] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleSubmit = async () => {
    if (!branchName || !selectedCategory || !selectedProduct || !soldQuantity || !preparedQuantity) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const newProduct = {
      branchName,
      productName: selectedProduct,
      category: selectedCategory,
      soldQuantity: Number(soldQuantity),
      preparedQuantity: Number(preparedQuantity),
      unfitQuantity: Number(unfitQuantity),
      expiredQuantity: Number(expiredQuantity),
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/mehsullar/mehsullar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      const result = await response.json();
      if (response.ok) {
        dispatch(addProduct(result));  // Add the product to Redux state
        alert('Product added successfully!');
      } else {
        console.error('Failed to add product:', result.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Filialın Adı',
      dataIndex: 'branchName',
      key: 'branchName',
      sorter: (a, b) => a.branchName.localeCompare(b.branchName),
    },
    {
      title: 'Məhsulun Adı',
      dataIndex: 'productName',
      key: 'productName',
      sorter: (a, b) => a.productName.localeCompare(b.productName),
    },
    {
      title: 'Satış Miqdarı',
      dataIndex: 'soldQuantity',
      key: 'soldQuantity',
      sorter: (a, b) => a.soldQuantity - b.soldQuantity,
    },
    {
      title: 'Hazırlanan Miqdar',
      dataIndex: 'preparedQuantity',
      key: 'preparedQuantity',
      sorter: (a, b) => a.preparedQuantity - b.preparedQuantity,
    },
    {
      title: 'Yararsız',
      dataIndex: 'unfitQuantity',
      key: 'unfitQuantity',
      sorter: (a, b) => a.unfitQuantity - b.unfitQuantity,
    },
    {
      title: 'Satış Tarixi Bitmiş',
      dataIndex: 'expiredQuantity',
      key: 'expiredQuantity',
      sorter: (a, b) => a.expiredQuantity - b.expiredQuantity,
    },
    {
      title: 'Qalıq',
      key: 'difference',
      render: (_, product) => product.preparedQuantity - (product.soldQuantity + product.unfitQuantity + product.expiredQuantity),
    },
  ];

  return (
    <div>
      <h1>Kontor Cədvəl</h1>
      <Form layout="inline" onFinish={handleSubmit} style={{ marginBottom: '20px' }}>
        <Form.Item label="Filialın Adı" required>
          <Select value={branchName} onChange={setBranchName} style={{ width: 200 }}>
            {branches.map((branch) => (
              <Option key={branch} value={branch}>
                {branch}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Kateqoriya Seçin" required>
          <Select value={selectedCategory} onChange={(value) => { setSelectedCategory(value); setSelectedProduct(''); }} style={{ width: 200 }}>
            {Object.keys(categoryProducts).map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {selectedCategory && (
      <Form.Item label="Product Name" required>
        <Select
          value={selectedProduct}
          onChange={(value) => setSelectedProduct(value)}
          placeholder="Select product"
        >
          {categoryProducts[selectedCategory].map((product) => (
            <Option key={product.name} value={product.name}>
              {product.name} - {product.price} AZN
            </Option>
          ))}
        </Select>
      </Form.Item>
    )}
        <Form.Item>
          <Input type="number" placeholder="Satış Miqdarı" value={soldQuantity} onChange={(e) => setSoldQuantity(e.target.value)} required />
        </Form.Item>
        <Form.Item>
          <Input type="number" placeholder="Hazırlanan Miqdar" value={preparedQuantity} onChange={(e) => setPreparedQuantity(e.target.value)} required />
        </Form.Item>
        <Form.Item>
          <Input type="number" placeholder="Yararsız" value={unfitQuantity} onChange={(e) => setUnfitQuantity(e.target.value)} required />
        </Form.Item>
        <Form.Item>
          <Input type="number" placeholder="Bitmiş Miqdar" value={expiredQuantity} onChange={(e) => setExpiredQuantity(e.target.value)} required />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Əlavə et
          </Button>
        </Form.Item>
      </Form>

      <Input.Search placeholder="Axtarış..." value={searchText} onChange={handleSearch} style={{ marginBottom: '20px', width: '300px' }} />
      <Table dataSource={filteredProducts} columns={columns} rowKey="_id" pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default AddPage;
