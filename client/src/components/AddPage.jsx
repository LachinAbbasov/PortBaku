import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { addProduct, selectProducts } from '../redux/productSlice';

const AddPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const newProduct = {
      productName: form.productName.value,
      soldQuantity: Number(form.soldQuantity.value),
      preparedQuantity: Number(form.preparedQuantity.value),
      unfitQuantity: Number(form.unfitQuantity.value),
      expiredQuantity: Number(form.expiredQuantity.value),
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
      dispatch(addProduct(savedProduct)); // Yeni məhsulu Redux-a əlavə edin

      // Formu təmizləyin
      form.reset();
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
        <TextField
          name="productName"
          label="Məhsulun Adı"
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="soldQuantity"
          label="Satış Miqdarı"
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="preparedQuantity"
          label="Hazırlanan Miqdar"
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="unfitQuantity"
          label="Yararsız"
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="expiredQuantity"
          label="Satış Tarixi Bitmiş"
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
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.soldQuantity}</TableCell>
                <TableCell>{product.preparedQuantity}</TableCell>
                <TableCell>{product.unfitQuantity}</TableCell>
                <TableCell>{product.expiredQuantity}</TableCell>
                <TableCell>{product.remainingQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AddPage;
