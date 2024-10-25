import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Form } from 'antd';
import { fetchBranches } from '../redux/branchSlice';
import { fetchCategoryProducts } from '../redux/categorySlice';
import ProductTable from './ProductTable';

const { Option } = Select;

const CreateProduct = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const branches = useSelector((state) => state.branches.branches);
  const products = useSelector((state) => state.categories.products);
  const branchLoading = useSelector((state) => state.branches.loading);
  const categoryLoading = useSelector((state) => state.categories.loading);

  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filialları fetch etmək
  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  // Kateqoriyaya uyğun məhsulları fetch etmək
  useEffect(() => {
    if (selectedBranch && selectedCategory) {
      dispatch(fetchCategoryProducts({ selectedCategory, branchName: selectedBranch }));
    }
  }, [dispatch, selectedBranch, selectedCategory]);

  // Filial seçimi
  const handleBranchChange = (value) => {
    setSelectedBranch(value);
    setSelectedCategory('');
  };

  // Kateqoriya seçimi
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  return (
    <div>
      <Form form={form}>
        <Form.Item label="Filial">
          <Select
            placeholder="Filialı seçin"
            onChange={handleBranchChange}
            loading={branchLoading}
            allowClear
          >
            {branches.map((branch, index) => (
              <Option key={index} value={branch}>
                {branch}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Kateqoriya">
          <Select
            placeholder="Kateqoriyanı seçin"
            onChange={handleCategoryChange}
            disabled={!selectedBranch}
            loading={categoryLoading}
            allowClear
          >
            {Object.keys(categoryEndpoints).map((category, index) => (
              <Option key={index} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      {/* Məhsul cədvəli */}
      <ProductTable products={products} />
    </div>
  );
};

export default CreateProduct;
