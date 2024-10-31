import React, { useEffect, useState } from 'react';
import { Table, Select, Spin, Typography, Button, Form, Modal, Row, Col, DatePicker, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setBranch, setCategory } from '../redux/productSlice';
import { EditOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import Swal from 'sweetalert2';
import axios from 'axios';  // Axios'u unutmayın
import "../Sass/ProductManagement.scss";

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
            console.log("Gönderilen veri:", row);  // Gönderilen veriyi loglayın
    
            // Sunucuya güncellenen veriyi gönderiyoruz
            await axios.patch(`http://localhost:5000/api/mehsullar/${key}`, {
                ...row,
            });
    
            // Verileri güncellemek için yeniden çek
            dispatch(fetchProducts());
    
            // Düzenleme modundan çıkıp tabloda verileri sıfırla
            setEditingKey('');
            setData([]); // Verileri sıfırlıyoruz
            
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

    // Satış Silme Fonksiyonu
    const handleDeleteSale = async (saleId) => {
        try {
            await axios.delete(`http://localhost:5000/api/mehsullar/${selectedProduct._id}/sales/${saleId}`);
            Swal.fire('Uğurlu', 'Satış qeydi silindi', 'success');
            
            // Silinen satış kaydını filteredSalesHistory'den çıkaralım
            setFilteredSalesHistory((prev) => prev.filter((sale) => sale._id !== saleId));
    
            // Ürünleri yeniden fetch ediyoruz
            dispatch(fetchProducts());
        } catch (error) {
            console.error('Hata:', error.response ? error.response.data : error.message);
            Swal.fire('Hata', error.response ? error.response.data.message : 'Bilinmeyen bir hata oluştu', 'error');
        }
    };
    
    

    const columns = [
        { title: 'Məhsul', dataIndex: 'productName', key: 'productName', editable: false },
        { title: 'Satış', dataIndex: 'soldQuantity', key: 'soldQuantity', editable: true },
        { title: 'Hazırlandı', dataIndex: 'preparedQuantity', key: 'preparedQuantity', editable: true },
        { title: 'Yararsız', dataIndex: 'unfitQuantity', key: 'unfitQuantity', editable: true },
        { title: 'Satış Müddəti Bitmiş', dataIndex: 'expiredQuantity', key: 'expiredQuantity', editable: true },
        { title: 'Stokda', dataIndex: 'stockQuantity', key: 'stockQuantity', editable: false },
        { title: 'Qiyməti', dataIndex: 'price', key: 'price', editable: true },
        { title: 'Satış Məbləği', dataIndex: 'totalPrice', key: 'totalPrice', editable: false },
        {
            title: 'Əməliyyat',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button onClick={() => save(record._id)} style={{ marginRight: 8 }}>
                            Save
                        </Button>
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
                <Button onClick={() => openModal(record)}>
                    Detallar
                </Button>
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
                            <Select.Option key={branch} value={branch}>
                                {branch}
                            </Select.Option>
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
                            <Select.Option key={category} value={category}>
                                {category}
                            </Select.Option>
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
                                    <Button
                                        type="danger"
                                        onClick={() => handleDeleteSale(record._id)}
                                    >
                                        Sil
                                    </Button>
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
