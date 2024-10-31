import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import '../Sass/DashBoard.scss'

const { Title, Text } = Typography;

const products = [
  { id: 1, name: 'Chocolate Cake', price: '10₼', img: '../../../imag4/' },
  { id: 2, name: 'Croissant', price: '2₼', img: '/images/croissant.jpg' },
  { id: 3, name: 'Bagel', price: '1.5₼', img: '/images/bagel.jpg' },
  { id: 4, name: 'Muffin', price: '3₼', img: '/images/muffin.jpg' },
  { id: 5, name: 'Bread Loaf', price: '4₼', img: '/images/bread.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
  { id: 6, name: 'Danish Pastry', price: '5₼', img: '/images/danish.jpg' },
];

const Dashboard = () => {
  return (
    <div style={{ padding: '20px' }}>



      {/* Product Cards */}
      <Title level={3}>Məhsullarımız</Title>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.img} />}
              style={{ borderRadius: '10px', overflow: 'hidden' }}
            >
              <Card.Meta title={product.name} description={<Text strong>{product.price}</Text>} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>

  );
};

export default Dashboard;
