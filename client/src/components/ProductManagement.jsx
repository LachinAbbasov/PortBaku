import React, { useEffect, useState } from 'react';
import { Table, Select, Spin, Typography, Input, Button, Form, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setBranch, setCategory } from '../redux/productSlice';
import axios from 'axios';

const Option = Select.Option;
const { Title } = Typography;
const { Column } = Table; // Column'ı tanımlıyoruz

const EditableCell = ({ editing, dataIndex, title, inputType, children, ...restProps }) => {
    const inputNode = <Input />;
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
    const [editingKey, setEditingKey] = useState('');
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

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

    const isEditing = (record) => record._id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record._id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item._id);

            if (index > -1) {
                const item = newData[index];

                const updatedItem = {};
                for (let field in row) {
                    if (row[field] !== item[field] && row[field] !== undefined && row[field] !== null) {
                        updatedItem[field] = row[field];
                    }
                }

                const patchData = {};
                Object.keys(updatedItem).forEach(key => {
                    patchData[key] = isNaN(updatedItem[key]) ? updatedItem[key] : Number(updatedItem[key]);
                });

                await axios.patch(`http://localhost:5000/api/mehsullar/${key}`, patchData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    newData.splice(index, 1, { ...item, ...response.data });
                    setData(newData);
                    setEditingKey('');
                })
                .catch(error => {
                    if (error.response) {
                        console.error('Sunucudan gelen hata:', error.response.data);
                    } else if (error.request) {
                        console.error('Sunucudan cevap alınamadı:', error.request);
                    } else {
                        console.error('İstek oluşturulurken hata:', error.message);
                    }
                });
            }
        } catch (errInfo) {
            console.log('Doğrulama hatası:', errInfo);
        }
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        const total = product.salesHistory.reduce((acc, sale) => acc + sale.totalPrice, 0);
        setTotalPrice(total);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedProduct(null);
    };

    const columns = [
        { title: 'Məhsul', dataIndex: 'productName', key: 'productName', editable: true },
        { title: 'Satış', dataIndex: 'soldQuantity', key: 'soldQuantity', editable: true },
        { title: 'Hazırlandı', dataIndex: 'preparedQuantity', key: 'preparedQuantity', editable: true },
        { title: 'Yararsız', dataIndex: 'unfitQuantity', key: 'unfitQuantity', editable: true },
        { title: 'Satış Müddəti Bitmiş', dataIndex: 'expiredQuantity', key: 'expiredQuantity', editable: true },
        { title: 'Stokda', dataIndex: 'stockQuantity', key: 'stockQuantity', editable: false },
        { title: 'Qiyməti', dataIndex: 'price', key: 'price', editable: true },
        { title: 'Satış Məbləği', dataIndex: 'totalPrice', key: 'totalPrice', editable: false },
        {
            title: 'Edit',
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
                    <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Button>
                );
            },
        },
        {
            title: 'Detaylar',
            render: (text, record) => (
                <Button onClick={() => openModal(record)}>Aç</Button>
            )
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
                shouldShowTable && (
                    <Form form={form} component={false}>
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
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
            >
                {selectedProduct && (
                    <div>
                        <h4>{selectedProduct.productName}</h4>
                        <Table
                            dataSource={selectedProduct.salesHistory}
                            pagination={false}
                            rowKey="_id"
                        >
                            <Column title="Tarix" dataIndex="date" key="date" render={(text) => new Date(text).toLocaleDateString()} />
                            <Column title="Satış" dataIndex="soldQuantity" key="soldQuantity" />
                            <Column title="Hazırlandı" dataIndex="preparedQuantity" key="preparedQuantity" />
                            <Column title="Yararsız" dataIndex="unfitQuantity" key="unfitQuantity" />
                            <Column title="Satış Müddəti Bitmiş" dataIndex="expiredQuantity" key="expiredQuantity" />
                            <Column title="Toplam Qiymət" dataIndex="totalPrice" key="totalPrice" />
                        </Table>
                        <div style={{ marginTop: 20 }}>
                            <strong>Cari Ay Üzerinden Toplam Qiymət: </strong>
                            <span>{totalPrice.toFixed(2)} AZN</span>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ProductManagement;
