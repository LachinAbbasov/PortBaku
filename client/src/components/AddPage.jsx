import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { addProduct, selectProducts } from '../redux/productSlice';

const categoryProducts = {
  Mayalı: [
    'Sadə bulka',
    'Kişmişli',
    'Qarabağ kətəsi',
    'Simit',
    'Vatruşka',
    'Alma cemli',
    'Kəsmikli kökə',
    'Şokaladlı',
    'Albalı cemli',
    'Qozlu',
    'Qoğal şor',
    'Qoğal şirin',
    'Darçınlı bulka',
    'Minni pizza',
    'Hod-dog',
    'Qaraköy',
    'Özbək dönəri',
    'Xaçapuri',
    'Qatlama toyuqlu',
    'Peraşki kartoflu',
    'Peraşki toyuqlu',
    'Pendirli açma',
    'Fransız bulkası'
  ],
  Tort: [
    'Yay tortu M',
    'Yat tortu S',
    'Birdmilk M',
    'Birdmilk S',
    'Honey M',
    'Honey S',
    'Napaleon M',
    'Napaleon S',
    'Banana cake M',
    'Banana cake S',
    'Damla şokaladlı M',
    'Damla şokaladlı S',
    'Kiyeviski M',
    'Kiyeviski S',
    'Kudruyaj M',
    'Kudruyaj S',
    'Blinçik M',
    'Blinçik S',
    'Black Forest roll',
    'Redvel vet roll',
    'Orange cake',
    'Engilis cake',
    'Skazka roll',
    'Birdmilk desert',
    'Honey desert',
    'Tiramisu desert',
    'Praqa desert',
    'Kudruyaj desert',
    'San Sebastian'
  ],
  Paxlavalar: [
    'Qozlu paxlava',
    'Fındıqlı paxlava',
    'Şokaladlı paxlava',
    'Türk paxlavaları'
  ],
  QuruMallar: [
    'Şəkərbura',
    'Acı badəm',
    'Şəkər çörəyi',
    'Mutaki',
    'Qozlu kətə',
    'Limonçik',
    'Damla peçeniyası',
    'Qızıl gül (kukis)'
  ],
  Kulinaria: [
    'Sendiviç',
    'Blinçik ətli',
    'Blinçik toyuqlu',
    'Blinçik toyuq tərəvəzli',
    'Blinçik kəsmikli',
    'Şumardin blinçik',
    'Toyuq nuggets',
    'Şnitzel',
    'Toyuq kotleti',
    'Toyuq çöp şiş'
  ],
  Salatlar: [
    'Paytaxt salatı',
    'Toyuq salatı mayanezli',
    'Toyuq salatı mayanezsiz',
    'Vinegret salatı',
    'Gavalı salatı',
    'Mimoza salatı',
    'Nar salatı',
    'Çuğundur salatı'
  ],
  Yeməklər: [
    'Toyuq file',
    'Fajitos',
    'Zəfəran plov',
    'Şəhriyyə plov',
    'Qarabaşaq',
    'Ev sayağı kartof',
    'Sobada tərəvəz',
    'Qril',
    'Ləvəngi',
    'Tabaka'
  ],
};

const AddPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const branches = ['İnqilab', 'Mərdəkan', 'Şüvalan', 'Aquapark', 'Nargilə', 'Mum', 'Buzovna', 'Bayl'];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const newProduct = {
      branchName: form.branchName.value,
      productName: selectedProduct, // İndi seçilmiş məhsul
      soldQuantity: Number(form.soldQuantity.value),
      preparedQuantity: Number(form.preparedQuantity.value),
      unfitQuantity: Number(form.unfitQuantity.value),
      expiredQuantity: Number(form.expiredQuantity.value),
    };

    const response = await fetch('http://localhost:5000/api/mehsullar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      const savedProduct = await response.json();
      dispatch(addProduct(savedProduct)); // Yeni məhsulu Redux-a əlavə edin
      form.reset();
      setSelectedCategory('');
      setSelectedProduct('');
    } else {
      console.error('Məhsul əlavə edilərkən xəta baş verdi.');
    }
  };

  const calculateDifference = (product) => {
    return product.preparedQuantity - (product.soldQuantity + product.unfitQuantity + product.expiredQuantity);
  };

  return (
    <div>
      <h1>Kontor Cədvəl</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Filialın Adı</InputLabel>
          <Select
            name="branchName"
            label="Filialın Adı"
            required
          >
            {branches.map((branch, index) => (
              <MenuItem key={index} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Kateqoriya Seçin</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedProduct(''); // Məhsul seçimini sıfırlayın
            }}
            required
          >
            {Object.keys(categoryProducts).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!selectedCategory}>
          <InputLabel>Məhsulun Adı</InputLabel>
          <Select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            {categoryProducts[selectedCategory]?.map((product) => (
              <MenuItem key={product} value={product}>
                {product}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="soldQuantity"
          label="Satış Miqdarı"
          type='number'
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="preparedQuantity"
          label="Hazırlanan Miqdar"
          type='number'
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="unfitQuantity"
          label="Yararsız"
          type='number'
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="expiredQuantity"
          label="Satış Tarixi Bitmiş"
          type='number'
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Əlavə Et!
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Filialın Adı</TableCell>
              <TableCell>Məhsulun Adı</TableCell>
              <TableCell>Satış Miqdarı</TableCell>
              <TableCell>Hazırlanan Miqdar</TableCell>
              <TableCell>Yararsız</TableCell>
              <TableCell>Satış Tarixi Bitmiş</TableCell>
              <TableCell>Qalıq</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.branchName}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.soldQuantity}</TableCell>
                <TableCell>{product.preparedQuantity}</TableCell>
                <TableCell>{product.unfitQuantity}</TableCell>
                <TableCell>{product.expiredQuantity}</TableCell>
                <TableCell>{calculateDifference(product)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AddPage;
