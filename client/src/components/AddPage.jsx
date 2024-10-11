import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Button, Form, Select } from 'antd';
import { addProduct, selectProducts } from '../redux/productSlice';

const { Option } = Select;

const categoryProducts = {
  Mayalı: ['Sadə bulka', 'Kişmişli', 'Qarabağ kətəsi', 'Simit', 'Vatruşka', 'Alma cemli', 'Kəsmikli kökə', 'Şokaladlı', 'Albalı cemli', 'Qozlu', 'Qoğal şor', 'Qoğal şirin', 'Darçınlı bulka', 'Minni pizza', 'Hod-dog', 'Qaraköy', 'Özbək dönəri', 'Xaçapuri', 'Qatlama toyuqlu', 'Peraşki kartoflu', 'Peraşki toyuqlu', 'Pendirli açma', 'Fransız bulkası'],
  Tort: ['Yay tortu M', 'Yat tortu S', 'Birdmilk M', 'Birdmilk S', 'Honey M', 'Honey S', 'Napaleon M', 'Napaleon S', 'Banana cake M', 'Banana cake S', 'Damla şokaladlı M', 'Damla şokaladlı S', 'Kiyeviski M', 'Kiyeviski S', 'Kudruyaj M', 'Kudruyaj S', 'Blinçik M', 'Blinçik S', 'Black Forest roll', 'Redvel vet roll', 'Orange cake', 'Engilis cake', 'Skazka roll', 'Birdmilk desert', 'Honey desert', 'Tiramisu desert', 'Praqa desert', 'Kudruyaj desert', 'San Sebastian'],
  Paxlavalar: ['Qozlu paxlava', 'Fındıqlı paxlava', 'Şokaladlı paxlava', 'Türk paxlavaları'],
  QuruMallar: ['Şəkərbura', 'Acı badəm', 'Şəkər çörəyi', 'Mutaki', 'Qozlu kətə', 'Limonçik', 'Damla peçeniyası', 'Qızıl gül (kukis)'],
  Kulinaria: ['Sendiviç', 'Blinçik ətli', 'Blinçik toyuqlu', 'Blinçik toyuq tərəvəzli', 'Blinçik kəsmikli', 'Şumardin blinçik', 'Toyuq nuggets', 'Şnitzel', 'Toyuq kotleti', 'Toyuq çöp şiş'],
  Salatlar: ['Paytaxt salatı', 'Toyuq salatı mayanezli', 'Toyuq salatı mayanezsiz', 'Vinegret salatı', 'Gavalı salatı', 'Mimoza salatı', 'Nar salatı', 'Çuğundur salatı'],
  Yeməklər: ['Toyuq file', 'Fajitos', 'Zəfəran plov', 'Şəhriyyə plov', 'Qarabaşaq', 'Ev sayağı kartof', 'Sobada tərəvəz', 'Qril', 'Ləvəngi', 'Tabaka'],
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
    const newProduct = {
      branchName,
      productName: selectedProduct,
      category: selectedCategory,
      soldQuantity: Number(soldQuantity),
      preparedQuantity: Number(preparedQuantity),
      unfitQuantity: Number(unfitQuantity),
      expiredQuantity: Number(expiredQuantity),
    };

    const response = await fetch('http://localhost:5000/api/mehsullar/mehsullar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      const savedProduct = await response.json();
      dispatch(addProduct(savedProduct));
      setBranchName('');
      setSelectedCategory('');
      setSelectedProduct('');
      setSoldQuantity('');
      setPreparedQuantity('');
      setUnfitQuantity('');
      setExpiredQuantity('');
    } else {
      console.error('Error adding product');
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
        <Form.Item label="Məhsulun Adı" required>
          <Select value={selectedProduct} onChange={setSelectedProduct} style={{ width: 200 }}>
            {categoryProducts[selectedCategory]?.map((product) => (
              <Option key={product} value={product}>
                {product}
              </Option>
            ))}
          </Select>
        </Form.Item>
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
