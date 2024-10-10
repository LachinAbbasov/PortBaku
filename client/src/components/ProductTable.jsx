import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, setProducts } from '../redux/productSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const ProductTable = ({ branchName, date }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mehsullar');
        if (response.ok) {
          const data = await response.json();
          dispatch(setProducts(data));
        } else {
          console.error('Məlumatları əldə edərkən xəta baş verdi.');
        }
      } catch (error) {
        console.error('Xəta:', error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  // Məhsulları filtrələmək
  const filteredProducts = products.filter(product => {
    const isBranchMatch = branchName ? product.branchName === branchName : true;
    const isDateMatch = date ? new Date(product.saleDate).toISOString().split('T')[0] === date : true;
    const isSearchMatch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    return isBranchMatch && isDateMatch && isSearchMatch;
  });

  return (
    <div>
      <TextField
        label="Məhsul Axtar"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.branchName}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.soldQuantity}</TableCell>
                  <TableCell>{product.preparedQuantity}</TableCell>
                  <TableCell>{product.unfitQuantity}</TableCell>
                  <TableCell>{product.expiredQuantity}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: 'center' }}>Məhsul tapılmadı</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductTable;
