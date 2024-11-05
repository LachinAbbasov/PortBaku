import React, { useEffect, useState } from 'react';
import { Table, Select, Spin, Typography, Button, Form, Modal, Row, Col, DatePicker, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setBranch, setCategory } from '../redux/productSlice';
import { EditOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import Swal from 'sweetalert2';
import "../Sass/ProductManagement.scss";
import axios from 'axios';  // Axios'u unutmayın

// Axios instance oluşturup interceptor ile token ekleme
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
});

const { Title } = Typography;
const { Column } = Table;
const { MonthPicker } = DatePicker;

const EditableCell = ({ editing, dataIndex, title, inputType, children, ...restProps }) => {
    const inputNode = <input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[{ required: true, message: `Please Input ${title}!` }]}

                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const ProductManagement = () => {
    const dispatch = useDispatch();
    const { filteredProducts, status, branches, categories, selectedBranch, selectedCategory } = useSelector((state) => state.product);

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingKey, setEditingKey] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [branchMonthlySales, setBranchMonthlySales] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [totalBranchSales, setTotalBranchSales] = useState(0);
    const [filteredSalesHistory, setFilteredSalesHistory] = useState([]);
    const [newlyAddedProducts, setNewlyAddedProducts] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        setData(filteredProducts);
    }, [filteredProducts]);

    const handleBranchChange = (value) => {
        dispatch(setBranch(value));
    };

    const handleCategoryChange = (value) => {
        dispatch(setCategory(value));
    };

    const handleMonthChange = (date, dateString) => {
        setSelectedMonth(dateString);
        if (dateString) {
            const monthlySalesByBranch = {};
            let totalSales = 0;

            filteredProducts.forEach(product => {
                const filteredSales = product.salesHistory.filter(sale => {
                    const saleDate = new Date(sale.date);
                    return saleDate.getFullYear() === new Date(dateString).getFullYear() &&
                        saleDate.getMonth() === new Date(dateString).getMonth();
                });

                const branchTotal = filteredSales.reduce((acc, sale) => acc + sale.totalPrice, 0);
                totalSales += branchTotal;

                if (monthlySalesByBranch[product.branchName]) {
                    monthlySalesByBranch[product.branchName] += branchTotal;
                } else {
                    monthlySalesByBranch[product.branchName] = branchTotal;
                }
            });

            setBranchMonthlySales(monthlySalesByBranch);
            setTotalBranchSales(totalSales);
        }
    };

    const isEditing = (record) => record._id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            soldQuantity: '',
            preparedQuantity: '',
            unfitQuantity: '',
            expiredQuantity: '',
            totalPrice: '',
            ...record,
        });
        setEditingKey(record._id);
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            console.log("Gönderilen veri:", row); 
    
            await axiosInstance.patch(`/mehsullar/${key}`, { ...row });
    
            dispatch(fetchProducts());
    
            setEditingKey('');
            setData([]);
            
        } catch (error) {
            console.error('Hata:', error.response ? error.response.data : error.message);
            Swal.fire('Hata', error.response ? error.response.data.message : 'Bilinmeyen bir hata oluştu', 'error');
        }
    };
    
    
    const cancel = () => {
        setEditingKey('');
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
        setFilteredSalesHistory(product.salesHistory);
    };

    const handleModalMonthChange = (date, dateString) => {
        if (selectedProduct && dateString) {
            const filteredSales = selectedProduct.salesHistory.filter(sale => {
                const saleDate = new Date(sale.date);
                return saleDate.getFullYear() === new Date(dateString).getFullYear() &&
                    saleDate.getMonth() === new Date(dateString).getMonth();
            });
            setFilteredSalesHistory(filteredSales);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedProduct(null);
        setFilteredSalesHistory([]);
        setSelectedMonth(null);
    };

    const handleDeleteSale = async (saleId) => {
        try {
            const result = await Swal.fire({
                title: 'Əminsiniz?',
                text: "Bu satış qeydini silmək istədiyinizə əminsiniz?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Bəli, sil!',
                cancelButtonText: 'Xeyr, ləğv et'
            });
    
            if (result.isConfirmed) {
                await axiosInstance.delete(`/mehsullar/${selectedProduct._id}/sales/${saleId}`);
    
                Swal.fire('Uğurlu!', 'Satış qeydi silindi.', 'success');
                
                setFilteredSalesHistory((prev) => prev.filter((sale) => sale._id !== saleId));
    
                dispatch(fetchProducts());
            }
        } catch (error) {
            console.error('Xəta:', error.response ? error.response.data : error.message);
            Swal.fire('Xəta', error.response ? error.response.data.message : 'Naməlum bir xəta baş verdi', 'error');
        }
    };
    

    const columns = [
        {
            title: 'Məhsul',
            dataIndex: 'productName',
            key: 'productName',
            editable: false,
            render: (text, record) => (
                <span>{text} {newlyAddedProducts.includes(record._id) && <CheckCircleTwoTone twoToneColor="#52c41a" />}</span>
            ),
            sorter: (a, b) => a.productName.localeCompare(b.productName), // Sıralama işlevi
        },
        {
            title: 'Satış',
            dataIndex: 'soldQuantity',
            key: 'soldQuantity',
            editable: true,
            sorter: (a, b) => a.soldQuantity - b.soldQuantity, // Sıralama işlevi
        },
        {
            title: 'Hazırlandı',
            dataIndex: 'preparedQuantity',
            key: 'preparedQuantity',
            editable: true,
            sorter: (a, b) => a.preparedQuantity - b.preparedQuantity, // Sıralama işlevi
        },
        {
            title: 'Yararsız',
            dataIndex: 'unfitQuantity',
            key: 'unfitQuantity',
            editable: true,
            sorter: (a, b) => a.unfitQuantity - b.unfitQuantity, // Sıralama işlevi
        },
        {
            title: 'Satış Müddəti Bitmiş',
            dataIndex: 'expiredQuantity',
            key: 'expiredQuantity',
            editable: true,
            sorter: (a, b) => a.expiredQuantity - b.expiredQuantity, // Sıralama işlevi
        },
        {
            title: 'Stokda',
            dataIndex: 'stockQuantity',
            key: 'stockQuantity',
            editable: false,
            sorter: (a, b) => a.stockQuantity - b.stockQuantity, // Sıralama işlevi
        },
        {
            title: 'Qiyməti',
            dataIndex: 'price',
            key: 'price',
            editable: true,
            sorter: (a, b) => a.price - b.price, // Sıralama işlevi
        },
        {
            title: 'Satış Məbləği',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            editable: false,
            sorter: (a, b) => a.totalPrice - b.totalPrice, // Sıralama işlevi
        },
        {
            title: 'Əməliyyat',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button onClick={() => save(record._id)} style={{ marginRight: 8 }}>Save</Button>
                        <Button onClick={cancel}>Cancel</Button>
                    </span>
                ) : (
                    <Tooltip title="Yeni satış məlumatı əlavə et">
                        <Button icon={<EditOutlined />} disabled={editingKey !== ''} onClick={() => edit(record)} />
                    </Tooltip>
                );
            },
        },
        {
            title: 'Detallar',
            dataIndex: 'details',
            render: (_, record) => (
                <Button onClick={() => openModal(record)}>Detallar</Button>
            ),
        },
    ];
    

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const shouldShowTable = selectedBranch && selectedCategory;

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Məhsul İdarəsi</Title>

            <div style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '18px' }}>
                Seçilən Ay üzrə Filialların Satışları:
                <ul>
                    {Object.keys(branchMonthlySales).map(branch => (
                        <li key={branch}>
                            {branch}: {branchMonthlySales[branch].toFixed(2)} AZN
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '18px' }}>
                Ümumi Satış Məbləği: {totalBranchSales.toFixed(2)} AZN
            </div>

            <Row gutter={16}>
                <Col xs={24} sm={12} md={8}>
                    <Select
                        style={{ width: '100%', marginBottom: 16 }}
                        placeholder="Şöbə Seçin"
                        onChange={handleBranchChange}
                        value={selectedBranch}
                    >
                        {branches.map((branch) => (
                            <Select.Option key={branch} value={branch}>{branch}</Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Kateqoriya Seçin"
                        onChange={handleCategoryChange}
                        value={selectedCategory}
                    >
                        {categories.map((category) => (
                            <Select.Option key={category} value={category}>{category}</Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <MonthPicker
                        style={{ width: '100%', marginBottom: 16 }}
                        placeholder="Ay seçin"
                        onChange={handleMonthChange}
                    />
                </Col>
            </Row>

            {status === 'loading' ? (
                <Spin size="large" />
            ) : (
                shouldShowTable && (
                    <Form form={form} component={false}>
                        <Table
                            components={{ body: { cell: EditableCell } }}
                            bordered
                            dataSource={data}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            rowKey="_id"
                            pagination={false}
                        />
                    </Form>
                )
            )}

            <Modal
                title="Satış Geçmişi"
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                width={800}
            >
                {selectedProduct && (
                    <div>
                        <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>{selectedProduct.productName}</h4>
                        <DatePicker
                            picker="month"
                            style={{ marginBottom: 16 }}
                            onChange={handleModalMonthChange}
                            placeholder="Ayı seçin"
                        />
                        <Table
                            dataSource={filteredSalesHistory}
                            pagination={false}
                            rowKey="_id"
                            bordered
                        >
                            <Column title="Tarix" dataIndex="date" key="date" render={(text) => new Date(text).toLocaleDateString()} />
                            <Column title="Satış" dataIndex="soldQuantity" key="soldQuantity" />
                            <Column title="Hazırlandı" dataIndex="preparedQuantity" key="preparedQuantity" />
                            <Column title="Yararsız" dataIndex="unfitQuantity" key="unfitQuantity" />
                            <Column title="Satış Müddəti Bitmiş" dataIndex="expiredQuantity" key="expiredQuantity" />
                            <Column title="Toplam Qiymət" dataIndex="totalPrice" key="totalPrice" />
                            <Column
                                title="Sil"
                                key="delete"
                                render={(_, record) => (
                                    <Button type="danger" onClick={() => handleDeleteSale(record._id)}>Sil</Button>
                                )}
                            />
                        </Table>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ProductManagement;