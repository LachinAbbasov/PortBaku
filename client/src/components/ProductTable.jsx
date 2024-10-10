import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, setProducts } from '../redux/productSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

// Styled Warning Button
const WarningButton = styled(Button)(({ theme }) => ({
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  minWidth: '0',
  padding: '0',
  backgroundColor: 'yellow',
  color: 'black',
  '&:hover': {
    backgroundColor: 'darkorange',
  },
}));

const ProductTable = ({ branchName, startDate, endDate }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

    const isDateMatch = startDate && endDate 
      ? new Date(product.createdAt) >= new Date(startDate) && new Date(product.createdAt) <= new Date(endDate + 'T23:59:59')
      : true;

    const isSearchMatch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    return isBranchMatch && isDateMatch && isSearchMatch;
  });

  // Məhsulu silmək
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Silmək istəyirsiniz?',
      text: 'Bu əməliyyatı geri qaytarmaq mümkün olmayacaq!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Bəli, sil!',
      cancelButtonText: 'İmtina et'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/mehsullar/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          const updatedProducts = products.filter(product => product._id !== id);
          dispatch(setProducts(updatedProducts));
          toast.success('Məhsul uğurla silindi!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          console.error('Məhsulu silərkən xəta baş verdi.');
        }
      } catch (error) {
        console.error('Xəta:', error);
      }
    }
  };

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

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
              <TableCell>Məhsulun Adı</TableCell>
              <TableCell>Satış Miqdarı</TableCell>
              <TableCell>Hazırlanan Miqdar</TableCell>
              <TableCell>Yararsız</TableCell>
              <TableCell>Satış Tarixi Bitmiş</TableCell>
              <TableCell>Qalıq</TableCell>
              <TableCell>Əməliyyatlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.soldQuantity}</TableCell>
                <TableCell>{product.preparedQuantity}</TableCell>
                <TableCell>{product.unfitQuantity}</TableCell>
                <TableCell>{product.expiredQuantity}</TableCell>
                <TableCell>{product.preparedQuantity - (product.soldQuantity + product.unfitQuantity + product.expiredQuantity)}</TableCell>
                <TableCell>
                  <WarningButton 
                    variant="contained" 
                    onClick={() => handleOpen(product)} // Məhsul detalları
                  >
                    ⚠️
                  </WarningButton>
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleDelete(product._id)} // Məhsulu silmək
                    style={{ marginLeft: '8px' }} // Butonlar arasında boşluq üçün
                  >
                    Sil
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: 'center' }}>
                  Məhsul tapılmadı
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer /> {/* Toastify container */}

      {/* Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Məhsulun Əlavə Olunma Tarixi</DialogTitle>
        <DialogContent>
  {selectedProduct && (
    <div>
      <p><strong>Məhsulun Adı:</strong> {selectedProduct.productName}</p>
      <p><strong>Əlavə Olunma Tarixi:</strong> {new Date(selectedProduct.createdAt).toLocaleString()}</p>
    </div>
  )}
</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Bağla</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductTable;
