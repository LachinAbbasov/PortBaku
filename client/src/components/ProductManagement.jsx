import React, { useEffect } from 'react';
import { Table, Select, Spin, Typography } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setBranch, setCategory } from '../redux/productSlice';
import '../Sass/ProductManagement.scss';

const Option = Select.Option;
const { Title } = Typography;

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { filteredProducts, status, branches, categories, selectedBranch, selectedCategory } = useSelector((state) => state.product);

  // Tüm ürünleri API'den çekelim
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Branch veya Category değiştiğinde filtrelemeyi Redux'ta yapıyoruz
  const handleBranchChange = (value) => {
    dispatch(setBranch(value));
  };

  const handleCategoryChange = (value) => {
    dispatch(setCategory(value));
  };

  // Ant Design Tablosu için kolonlar
  const columns = [
    { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
    { title: 'Sold Quantity', dataIndex: 'soldQuantity', key: 'soldQuantity' },
    { title: 'Prepared Quantity', dataIndex: 'preparedQuantity', key: 'preparedQuantity' },
    { title: 'Unfit Quantity', dataIndex: 'unfitQuantity', key: 'unfitQuantity' },
    { title: 'Expired Quantity', dataIndex: 'expiredQuantity', key: 'expiredQuantity' },
    { title: 'Stock Quantity', dataIndex: 'stockQuantity', key: 'stockQuantity' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
  ];

  return (
    <div>
      <Title level={2}>Product Management</Title>
      <Select
        style={{ width: 200, marginRight: 10 }}
        placeholder="Select Branch"
        onChange={handleBranchChange}
        value={selectedBranch}
      >
        {branches.map((branch) => (
          <Option key={branch} value={branch}>
            {branch}
          </Option>
        ))}
      </Select>
      <Select
        style={{ width: 200 }}
        placeholder="Select Category"
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
        {categories.map((category) => (
          <Option key={category} value={category}>
            {category}
          </Option>
        ))}
      </Select>

      {status === 'loading' ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="_id"
          locale={{ emptyText: 'No data' }}
        />
      )}
    </div>
  );
};

export default ProductManagement;
