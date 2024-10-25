import React, { useState, useEffect } from 'react';
import { Table, Input, Button } from 'antd';
import axios from 'axios';

const ProductTable = ({ selectedBranch, selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [editRow, setEditRow] = useState(null);

  // Məhsulları fetch etmək
  useEffect(() => {
    if (selectedBranch && selectedCategory) {
      fetchProducts();
    }
  }, [selectedBranch, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/products?branch=${selectedBranch}&category=${selectedCategory}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Redaktə olunan sətiri təyin edir
  const handleEdit = (record) => {
    setEditRow({ ...record });
  };

  // Dəyişiklikləri yadda saxlayır
  const handleSave = async () => {
    try {
      const updatedProduct = {
        ...editRow,
        totalPrice: editRow.soldQuantity * editRow.price,
        stockQuantity: editRow.preparedQuantity - (editRow.soldQuantity + editRow.unfitQuantity + editRow.expiredQuantity),
      };
      await axios.put(`/api/products/${editRow._id}`, updatedProduct);
      setEditRow(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Input dəyişiklikləri idarə edir
  const handleInputChange = (e, field) => {
    setEditRow({ ...editRow, [field]: e.target.value });
  };

  const columns = [
    {
      title: 'Məhsul Adı',
      dataIndex: 'productName',
      render: (text, record) =>
        editRow && editRow._id === record._id ? (
          <Input value={editRow.productName} onChange={(e) => handleInputChange(e, 'productName')} />
        ) : (
          text
        ),
    },
    {
      title: 'Satılan Miqdar',
      dataIndex: 'soldQuantity',
      render: (text, record) =>
        editRow && editRow._id === record._id ? (
          <Input
            type="number"
            value={editRow.soldQuantity}
            onChange={(e) => handleInputChange(e, 'soldQuantity')}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Hazırlanan Miqdar',
      dataIndex: 'preparedQuantity',
      render: (text, record) =>
        editRow && editRow._id === record._id ? (
          <Input
            type="number"
            value={editRow.preparedQuantity}
            onChange={(e) => handleInputChange(e, 'preparedQuantity')}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Yararsız Miqdar',
      dataIndex: 'unfitQuantity',
      render: (text, record) =>
        editRow && editRow._id === record._id ? (
          <Input
            type="number"
            value={editRow.unfitQuantity}
            onChange={(e) => handleInputChange(e, 'unfitQuantity')}
          />
        ) : (
          text
        ),
    },
    {
      title: 'İstifadə Müddəti Bitmiş Miqdar',
      dataIndex: 'expiredQuantity',
      render: (text, record) =>
        editRow && editRow._id === record._id ? (
          <Input
            type="number"
            value={editRow.expiredQuantity}
            onChange={(e) => handleInputChange(e, 'expiredQuantity')}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Qalıq Miqdar',
      dataIndex: 'stockQuantity',
      render: (text) => text,
    },
    {
      title: 'Qiymət',
      dataIndex: 'price',
      render: (text, record) =>
        editRow && editRow._id === record._id ? (
          <Input type="number" value={editRow.price} onChange={(e) => handleInputChange(e, 'price')} />
        ) : (
          `$${text}`
        ),
    },
    {
      title: 'Ümumi Qiymət',
      dataIndex: 'totalPrice',
      render: (text, record) => (editRow && editRow._id === record._id ? editRow.soldQuantity * editRow.price : text),
    },
    {
      title: 'Əməliyyat',
      render: (text, record) =>
        editRow && editRow._id === record._id ? (
          <Button type="primary" onClick={handleSave}>
            Yadda Saxla
          </Button>
        ) : (
          <Button onClick={() => handleEdit(record)}>Redaktə Et</Button>
        ),
    },
  ];

  return <Table columns={columns} dataSource={products} rowKey="_id" />;
};

export default ProductTable;
